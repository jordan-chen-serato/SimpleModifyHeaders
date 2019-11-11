
describe('FirewallHeader', () => {

  describe('#function getHeaderValue', () => {

    it('generates a header value that matches the expected pattern', () => {
      const firewallHeader = new Serato.FirewallHeader()
      const headerValue = firewallHeader.getHeaderValue()
      expect(headerValue).toMatch(firewallHeader.headerPattern)
    })

    it('generates the same value when called twice (for the same instance)', () => {
      const firewallHeader = new Serato.FirewallHeader()
      const headerValue = firewallHeader.getHeaderValue()
      const headerValue2 = firewallHeader.getHeaderValue()
      expect(headerValue).toEqual(headerValue2)
    })
  })

  describe('#function replaceInvalidCharacters', () => {
    it('replaces \\ characters in the hash', () => {
      const firewallHeader = new Serato.FirewallHeader()
      const newHeaderValue = firewallHeader.replaceInvalidCharacters('\\\\\\')
      expect(newHeaderValue).toEqual('yyy')
    })

    it('replaces " characters in the hash', () => {
      const firewallHeader = new Serato.FirewallHeader()
      const newHeaderValue = firewallHeader.replaceInvalidCharacters('"""')
      expect(newHeaderValue).toEqual('xxx')
    })
  })
})