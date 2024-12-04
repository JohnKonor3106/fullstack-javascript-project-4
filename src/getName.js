const getName = (url) => {
    const regexProtocol = /^(https?:\/\/)/;
    const regexpReplace = /[^a-zA-Z0-9]/g;
    const withoutProtocol = url.replace(regexProtocol, '');
    const nameDir = withoutProtocol.replace(regexpReplace, '-')
    
    return nameDir+'.html'
}

export default getName;