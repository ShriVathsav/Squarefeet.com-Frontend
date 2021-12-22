const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

export const inWords = (num) => {
    if ((num = num.toString()).length > 9) {
        if(parseInt(num) === 1000000000){
            return "INR Hundred Crore"
        }
        return "overflow"
    };
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return `INR ${str}`;
}

export const display = (num) => {
    if ((num = num.toString()).length > 9) {
        if(parseInt(num) === 1000000000){
            return "100 crore"
        }
        return "overflow"
    };
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';

    let a;

    if(parseInt(n[1]) !== 0){
        a =  parseFloat(n[1] + "." + n[2] + n[3] + n[4] + n[5]) + " crore"
    } else if(parseInt(n[2]) !== 0){
        a = parseFloat(n[2] + "." + n[3] + n[4] + n[5]) + " lakh"
    } else if(parseInt(n[3]) !== 0){
        a = parseFloat(n[3] + "." + n[4] + n[5]) + " thousand"
    } else if(parseInt(n[4]) !== 0){
        a = parseFloat(n[4] + "." + n[5]) + " hundred"
    }else if(parseInt(n[5]) !== 0){
        a = parseFloat(n[5])
    }
    return a;
}

export const propertyDisplayConvert = (num) => {
    if(!num){
        return ""
    }
    if ((num = num.toString()).length > 9) {
        if(parseInt(num) === 1000000000){
            return "100 Cr"
        }
        return "overflow"
    };
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';

    let a;

    if(parseInt(n[1]) !== 0){
        a =  parseFloat(n[1] + "." + n[2]) + " Cr"
    } else if(parseInt(n[2]) !== 0){
        a = parseFloat(n[2] + "." + n[3]) + " Lakh"
    } else if(parseInt(n[3]) !== 0){
        a = parseFloat(n[3]) + "," + n[4] + n[5]
    } else if(parseInt(n[4]) !== 0){
        a = parseFloat(n[4] + n[5])
    }else if(parseInt(n[5]) !== 0){
        a = parseFloat(n[5])
    }
    return a;
}