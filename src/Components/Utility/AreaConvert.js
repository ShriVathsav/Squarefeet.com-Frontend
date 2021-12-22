const convertToSqM = (value) => {
    return Math.round(((value / 10.764) + Number.EPSILON) * 10000) / 10000
}

const convertToAcres = (value) => {
    return Math.round(((value / 43560) + Number.EPSILON) * 10000) / 10000
}

const convertToHectares = (value) => {
    return Math.round(((value / 107639) + Number.EPSILON) * 100000) / 100000
}

const convertToYards = (value) => {
    return Math.round(((value / 9) + Number.EPSILON) * 10000) / 10000
}

const convertToSqFt = (value) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
}

export const convertArea = (value, unit) => {
    if(unit === "sq.ft."){
        return convertToSqFt(value)
    } else if(unit === "sq.m."){
        return convertToSqM(value)
    } else if(unit === "sq.yards"){
        return convertToYards(value)
    } else if(unit === "acres"){
        return convertToAcres(value)
    } else if(unit === "hectares"){
        return convertToHectares(value)
    }
}