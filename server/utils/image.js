const getFileName = (file) => {
    if(!file) return null; 
    const filePath = file.path;
    const fileSplit = filePath.split("\\");
    return `${fileSplit[1]}/${fileSplit[2]}`;
};

module.exports = { getFileName };
