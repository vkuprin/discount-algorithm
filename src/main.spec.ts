const {
  describe,
  expect,
  it,
} = require('@jest/globals');

const {
  Checkout,
  pricingRules,
  Codes,
} = require('./main.js');

describe('Checkout', () => {
  it('should return 0 if no items are scanned', () => {
    const checkout = new Checkout(pricingRules);
    expect(checkout.total()).toBe(0);
  });

  it('should return the total price of the scanned items', () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan(Codes.VOUCHER);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.MUG);
    expect(checkout.total()).toBe(32.5);
  });

  it('should apply the 2-for-1 discount to the total price', () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan(Codes.VOUCHER);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.VOUCHER);
    expect(checkout.total()).toBe(25);
  });

  it('should apply the bulk discount to the total price', () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.VOUCHER);
    checkout.scan(Codes.TSHIRT);
    expect(checkout.total()).toBe(81);
  });

  it('should sum 3 mugs', () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.MUG);
    expect(checkout.total()).toBe(22.5);
  });

  it('should sum 3 mugs and 1 tshirt', () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.TSHIRT);
    expect(checkout.total()).toBe(42.5);
  });

  it('should sum 3 mugs and 3 tshirt and 2 voucher', () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.MUG);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.TSHIRT);
    checkout.scan(Codes.VOUCHER);
    checkout.scan(Codes.VOUCHER);
    expect(checkout.total()).toBe(84.5);
  });
});
