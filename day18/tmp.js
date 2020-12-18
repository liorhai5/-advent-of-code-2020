const solve = input => {
    const problems = input.map(line=>line.replace(/\(/g,'( ').replace(/\)/g,' )').split(' ').map(token=>parseInt(token)||token))
    return problems.map(solveProblem2).reduce((a,b)=>a+b,0)
}

const solveProblem2 = tokens => {
    let parsedTokens = [];
    let ignoreDepth = 0;
    let terminated = null;
    // parsing tokens
    tokens.forEach((token,i)=>{
        if(terminated)return;
        if(token=='('){
            if(ignoreDepth==0){
                const innerResult = solveProblem2(tokens.slice(i+1))
                parsedTokens.push(innerResult)
            }
            ignoreDepth++
        }else if(token==')'){
            ignoreDepth--
            if(ignoreDepth<0)terminated=true
        }else if(ignoreDepth!=0)return;
        else parsedTokens.push(token)
    })
    console.log(parsedTokens)

    //loop and add
    while(parsedTokens.findIndex(x=>x=='+')>-1){
        const found = parsedTokens.findIndex(x=>x=='+')
        const added = parsedTokens[found-1]+parsedTokens[found+1]
        parsedTokens=[
            ...parsedTokens.slice(0,found-1),
            added,
            ...parsedTokens.slice(found+2)
        ]
    }
    //loop and multiply
    const solved = parsedTokens.join('').split('*').reduce((a,b)=>a*parseInt(b),1)

    return solved
}

module.exports = {
    solve,
    result: 314455761823725,
    exampleResult: 693891
};
