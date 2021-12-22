export const validateNumeric = (num, min, max) => {
    if(Object.is(parseFloat(num), NaN)) return false
    console.log(num <= max, num >=min, num)
    return num <= max && num >=min
}

export const removeSpacesFromTextInput = (val) => {
    return val.replace(/\s\s+/g, ' ')
}

export const removeSpacesFromPasswordInput = (val) => {
    return val.replace(/\s/g, "")
}

export const validatePhone = (num) => {
    return Object.is(parseInt(num), NaN) ? false : true
}

export const validateEmail = (email) => {
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
}