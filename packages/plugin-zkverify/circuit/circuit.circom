pragma circom 2.1.6;

template AgeCheck() {
    // Input signal for the age
    signal input age;
    // Output signal (0 for underage, 1 for adult)
    signal output isAdult;
    
    // Check if age is >= 18
    isAdult <-- age >= 18 ? 1 : 0;
    
    // Constrain isAdult to be either 0 or 1
    isAdult * (1 - isAdult) === 0;
    
    // Constraint to verify the age check
    signal diff <== age - 18;
    signal check <== isAdult * diff;
    check * (1 - isAdult) === 0;
}

component main = AgeCheck();

/* INPUT = {
    "age": "20"
} */