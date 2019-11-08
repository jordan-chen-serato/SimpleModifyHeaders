
describe('FirewallHeader', () => {

  describe('#function getHeaderValue', () => {

    it('generates a header value that matches the expected pattern', () => {
      const firewallHeader = new FirewallHeader()
      const headerValue = firewallHeader.getHeaderValue()
      expect(headerValue).toMatch(firewallHeader.headerPattern)
    })

    it('generates the same value when called twice (for the same instance)', () => {
      const firewallHeader = new FirewallHeader()
      const headerValue = firewallHeader.getHeaderValue()
      const headerValue2 = firewallHeader.getHeaderValue()
      expect(headerValue).toEqual(headerValue2)
    })
  })
})