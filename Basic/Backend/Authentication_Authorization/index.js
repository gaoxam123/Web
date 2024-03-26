const bcrypt = require('bcrypt')

const hashPassword = async(pw) => {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(pw, salt)
    console.log(salt)
    console.log(hash)
}

const login = async(pw, hash) => {
    const res = await bcrypt.compare(pw, hash)
    if(res) {
        console.log('logged in')
    }
    else {
        console.log('incorrect')
    }
}

hashPassword('monkey')