const data = require('./data.json');

enum Codes {
    VOUCHER = 'VOUCHER',
    TSHIRT = 'TSHIRT',
    MUG = 'MUG',
}

interface Product {
    code: Codes;
    name: string;
    price: number;
}

interface PricingRules {
    code: Codes;
    type: string;
}

const products = data as Product[];

const pricingRules: PricingRules[] = [
  {
    code: Codes.VOUCHER,
    type: '2-for-1',
  },
  {
    code: Codes.TSHIRT,
    type: 'bulk',
  },
];

class Checkout {
  pricingRules: PricingRules[];

  private scannedItems: Product[] = [];

  constructor(pricingRules: PricingRules[]) {
    this.pricingRules = pricingRules;
  }

  scan(code: Codes): void {
    const product = products.find((product) => product.code === code);
    if (product) {
      this.scannedItems.push(product);
    }
  }

  total(): number {
    return this.scannedItems.reduce((acc, item) => {
      const rule = this.pricingRules.find((rule) => rule.code === item.code);
      if (rule) {
        switch (rule.type) {
          case '2-for-1':
            if (this.scannedItems.filter((item) => item.code === rule.code).length >= 2) {
              if (rule.code === Codes.VOUCHER) {
                return acc + item.price / 2;
              }
            }
            break;

          case 'bulk':
            const bulkItems = this.scannedItems.filter(
              (item) => item.code === Codes.TSHIRT,
            );
            if (bulkItems.length >= 3) {
              return acc + 19;
            }
            return acc + item.price;
          default:
            return acc + item.price;
        }
      }
      return acc + item.price;
    }, 0);
  }
}

export {
  Checkout,
  Codes,
  products,
  pricingRules,
};

export type {
  Product,
  PricingRules,
};
