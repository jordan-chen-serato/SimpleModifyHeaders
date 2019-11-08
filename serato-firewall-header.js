// Note that unlike the rest of this project, this file contains ES6 (but that should be fine for the versions of FF and
// Chrome that the team uses, even without transpilation)

class FirewallHeader {
  shifts = [-8, 8, -16, 16]
  prefixCharacters = 'serato'

  // For reference and testing
  headerPattern = '"[serato]{3}~[(-1Y-\\[\\]^y]{8}[8-Ai-n]{8}[ -!#-)Q-Vx]{8}[@-Iq-v]{8}"'

  constructor() {
    this.prefix = shuffleString(this.prefixCharacters).substr(0, 3)
    this.timestamp = (new Date()).toISOString() // Close enough to 'Y-m-d\TH:i:sP' (PHP SDK implementation)
    this.characterReplacements = new Map([['"', 'x'], ['\\', 'y']])
  }

  /**
   * Generates and returns a value for the x-serato-firewall header
   * @return {string}
   */
  getHeaderValue() {
    const hash = this.getHeaderHash(this.timestamp)
    return `"${this.prefix}~${hash}"`
  }

  getHeaderHash(textToHash) {
    const hash = md5(textToHash)
    const chunks = hash.match(/.{8}/g)
    let shiftedHash = ''

    // Shift each chunk's ASCII character values by the corresponding offset in the 'shifts' array
    for (let [i, chunk] of chunks.entries()) {
      shiftedHash += this.shiftChunk(chunk, this.shifts[i])
    }

    return this.replaceInvalidCharacters(shiftedHash)
  }

  shiftChunk(chunk, shift) {
    // Shifts the chunk's (ASCII) characters by the given offset
    return chunk.split('').map(c => this.shiftCharacter(c, shift)).join('')
  }

  shiftCharacter(character, shift) {
    return String.fromCharCode(character.charCodeAt(0) + shift)
  }

  /**
   * Replaces characters that are invalid in quoted string HTTP header field values with valid characters outside the
   * expected range. (See RFC 2616 section 2.2 and RFC 7230 section 3.2.6)
   *
   * @param headerHash Hash in which to replace invalid characters
   * @return Hash with invalid characters replaced
   */
  replaceInvalidCharacters(headerHash) {
    for (let [original, replacement] of this.characterReplacements) {
      const pattern = original.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      const re = new RegExp(pattern, 'g') // Required for all instances to be replaced
      headerHash = headerHash.replace(re, replacement)
    }

    return headerHash
  }
}

function shuffleString(str) {
  return str.split('').sort(() => 0.5 - Math.random()).join('')
}
