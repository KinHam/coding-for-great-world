export {}
/*
    给定一个长度为n的数组arr,求有多少个子数组满足
    子数组两端的值,是这个子数组的最小值和次小值,最小值
    和次小值谁在最左和最右无所谓
*/
function getNums(arr:number[]){
    if(!arr || arr.length < 2) return 0
    const N = arr.length
    const stack = new Array(N)
    const times = new Array(N).fill(0)
    let size = 0
    let ans = 0
    for(let i = 0; i < N; i++){
        while(size > 0 && stack[size - 1] > arr[i]){
            ans += times[size - 1]
            ans += Cn(times[--size])
        }
        if(size !== 0 && stack[size - 1] === arr[i]){
            times[size - 1]++
        }else{
            stack[size] = arr[i]
            times[size++] = 1
        }
    }
    while(size > 0){
        ans += Cn(times[--size])
    }
    for(let i = N - 1; i >= 0; i--){
        while(size > 0 && stack[size - 1] > arr[i]){
            ans += times[--size]
        }
        if(size != 0 && stack[size - 1] === arr[i]){
            times[size-1]++
        }else{
            stack[size] = arr[i]
            times[size++] = 1
        }
    }
    return ans
}

function Cn(n:number):number{
    return (n * (n - 1)) >>1
}

function test(arr:number[]):number{
    if(!arr || arr.length < 2) return 0
    let ans = 0
    for(let start = 0; start < arr.length - 1; start++){
        for(let end = start + 1; end < arr.length; end++){
            let max = Math.max(arr[start],arr[end])
            let flag = true
            for(let i = start + 1; i < end; i++){
                if(arr[i] < max){
                    flag = false
                    break
                }
            }
            ans += flag ? 1 : 0
        }
    }
    return ans
}
const maxLen = 1000
const maxVal = 1000
const testTimes = 1000
function getRandomArr(maxLen:number,maxVal:number):number[]{
    maxLen = Math.random() * maxLen | 0
    const ans = new Array(maxLen)
    for(let i = 0; i < maxLen; i++){
        ans[i] = Math.random() * maxVal | 0
    }
    return ans
}
for(let i = 0; i < testTimes; i++){
    const arr = getRandomArr(maxLen,maxVal)
    const ans1 = test(arr)
    const ans2 = getNums(arr)
    if(ans1 !== ans2){
        console.error('Oops')
        break
    }
}
console.info('ending')