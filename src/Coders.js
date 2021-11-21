class Coder {

    static caesarCipherCoder(string, shift, action = 'encode') {
        if (action === 'decode') shift *= -1;
        shift = shift % 26; 
        let result = ''; 
        for (const letter of string) {
    
            let letterCode = letter.charCodeAt(0);
            if (letterCode >= 65 && letterCode <= 90) {
                letterCode = letterCode + shift;
                if (letterCode > 90) {
                    letterCode = letterCode - 26;
                } else if (letterCode < 65) {
                    letterCode = letterCode + 26;
                }
            } else if (letterCode >= 97 && letterCode <= 122) {
                letterCode = letterCode + shift;                
                if (letterCode > 122) {
                    letterCode = letterCode - 26;
                } else if (letterCode < 97) {
                    letterCode = letterCode + 26;
                }
            }
        
            result = result + String.fromCharCode(letterCode);
        }
        
        return result;  
    }

    static atbashCipherCoder(string = '') {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
        const alphabet1 = "abcdefghijklmnopqrstuvwxyz";
        const tebahpla1 = "zyxwvutsrqponmlkjihgfedcba";

        let result = '';
        
        for (const letter of string) {
            let finalLetter = letter;
            let letterCode = letter.charCodeAt(0);
            if (letterCode >= 65 && letterCode <= 90) {
                const index = alphabet.indexOf(letter);
                finalLetter = tebahpla[index];
            } else if (letterCode >= 97 && letterCode <= 122) {
                const index = alphabet1.indexOf(letter);
                finalLetter = tebahpla1[index];
            }
            result = result + finalLetter;
        }

        return result;
    }

}

module.exports = Coder;