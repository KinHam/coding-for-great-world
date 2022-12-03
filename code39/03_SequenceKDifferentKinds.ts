export {}
/*
    给定一个字符串str,和一个正数k
    str子序列的字符种数必须是k种，返回有多少子序列满足这个条件
    已知str中都是小写字母
*/

// 'aaabb' // 2
function seqKDifKinds(s:string,k:number): number{
    if(!s || k < 1) return 0
    const bu = new Array(26).fill(0)
    for(let str of s){
        bu[str.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }
    const dp = new Array(26).fill(null).map(()=>new Array(k+1).fill(0))
    for(let i = 0; i < 26; i++){
        dp[i][0] = 1
    }
    for(let i = 24; i>=0;i--){
        for(let j = 1; j <= k; j++){
            dp[i][j] += dp[i+1][j]
            dp[i][j] += ((1 << bu[i]) - 1) * dp[i+1][j-1]
        }
    }
    return dp[0][k]
}
function f(s:string,k:number):number{
    if(!s || k < 1) return 0
    const bu = new Array(26).fill(0)
    for(let str of s){
        bu[str.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }
    return p(bu,0,k)
}
function p(bu:number[],i:number,rest:number):number{
    if(rest === 0) return 1
    if(i === bu.length) return 0
    let ans1 = p(bu,i+1,rest)
    let ans2 = 0
    if(bu[i] > 0){
        ans2 = math(bu[i]) * p(bu,i+1,rest-1)
    }
    return ans1 + ans2
}
function math(num:number):number{
    return (1 << num) - 1
}

const s = 'abbdfer'
const k = 4
// 7 3
const ans = f(s,k)
const ans2 = seqKDifKinds(s,k)
console.info('ans',ans)
console.info('ans2',ans2)