function adaptOutput(emissions) {
    const adaptedOutput = Array(78).fill(0);
    adaptedOutput[0] = emissions;
    return adaptedOutput;
}

module.exports = adaptOutput;
