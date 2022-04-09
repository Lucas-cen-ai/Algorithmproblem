// 1 编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。（实例可能监听多个不同的事件，也可以去除监听事件）
class People {
   
    constructor(name) {
      this.name = name
    }
    hash = new Map()
    res = []
    // TODO: 请在此处完善代码
  
    sayHi() {
      console.log(`Hi, I am ${this.name}`)
    }
    // 使用map数据结构来存储多个相同的事件,将函数和函数名以二维数组的形式存储
    on (enevtType,func) {
      if(this.hash.has(enevtType)) {
        this.hash.set(enevtType,[...this.hash.get(enevtType),func])
      }else {
        this.hash.set(enevtType,[func])
      }
    }
    off(arg0 ,fun) {
      let arr = this.hash.get(arg0)
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].name != funNmae.name ) {
            this.res.push(arr[i])
        }
      }
      this.hash.set(arg0,this.res)
    }
    
    emit(arg0 , arg1) {
       this.name = arg1;
       let arr = this.hash.get(arg0)
       for(let key of arr) {
         key(this.name)
       }
    }
  }
  
  
  
  /* 以下为测试代码 */
  const say1 = (greeting) => {
    console.log(`${greeting}, nice meeting you.`)
  }
  
  const say2 = (greeting) => {
    console.log(`${greeting}, nice meeting you, too.`)
  }
  const say3 = (greeting) => {
    console.log(`${greeting}, nice meeting you, too  hhhh.`)
  }
  const jerry = new People('Jerry')
  // jerry.sayHi()
  // => 输出：'Hi, I am Jerry'
  
  // jerry.on('greeting', say1)
  // jerry.on('greeting', say2)
  // jerry.on("greeting", say3)
  
  // jerry.emit('greeting', 'Hi')
  // => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'
  
  // jerry.off('greeting', say1)
  // jerry.emit('greeting', 'Hi')
  // => 只输出：'Hi, nice meeting you, too'




 // 2 完成 sleep 函数，可以达到下面的效果：

const sleep = (duration) => {
  // TODO
 return   new Promise((resolve,resject) => {
  setTimeout(() => {
    resolve()
  },duration)
  })
}

const anyFunc = async () => {
  console.log("123") // 输出 123
  await sleep(300) // 暂停 300 毫秒
  console.log("456") // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
}
// anyFunc()

// 3 完成 deepGet 函数，给它传入一个对象和字符串，字符串表示对象深层属性的获取路径，可以深层次获取对象内容：
function arguemntsArr(prop,str,arr) {
  for(let i = 0; i < prop.length; i++) {
    if((prop.charCodeAt(i) >= 65 && prop.charCodeAt(i) <= 90) || (prop.charCodeAt(i) >= 97 && prop.charCodeAt(i) <= 122)) {
       str += prop[i]
    }
    if(prop[i] == "." || i == prop.length - 1) {
      arr.push(str)
      str = "";
    }
}
return {arr}
}

const deepGet = (obj, prop) => {
  // TODO: 在此处完善代码 
  // 使用递归遍历对象
  let name = prop.split('.')
  let str = ''
  let arrs = []
  let nums = 0;
  //遍历属性，将属性名放入数组中
  let {arr} = arguemntsArr(prop,str,arrs)
    let res;
    const dfs = (objs,num) => {
      if(!(objs instanceof Object ) ) {
        nums = num
        return objs
      }
      if( objs instanceof Array) {
        nums = num
        return objs
      }
      for(let i = num; i < arr.length; i++) {
        for(let key in objs) {
          if(key == arr[i]) {
            res = objs[key];
          }
          dfs(objs[key],num++)
      }
      }
    }
    dfs(obj,0,)
    if(res instanceof Array) {
      res = isArray(res,name,nums)
      dfs(res,nums)
    }
   
    return  res instanceof Object ? undefined : res;
}
// 判断是否返回的值是否是数组类型
function isArray (res,name,nums) {
    for(let i = nums - 1; i < name.length; i++) {
        for(let j = 0; j < name[nums-1].length; j++) {
          if(parseInt(name[i][j]) == Number(name[i][j])) {
            res = res[name[i][j]]
          }
        }
    }
  return res
}

/** 以下为测试代码 */
// console.log(deepGet({
//   school: {
//     student: { name: 'Tomy' },
//   },
// }, 'school.student.name')) // => 'Tomy'

console.log(deepGet({
  school: {
    students: [
      { name: 'Tomy' },
      { name: 'Lucy' },
    ],
  }
}, 'school.students[1].name')) // => 'Lucy'

// 对于不存在的属性，返回 undefined
// deepGet({ user: { name: 'Tomy' } }, 'user.age') // => undefined
// console.log( deepGet({ user: { name: 'Tomy' } }, 'school.user.age')) // => undefined


// 4 完成 combo 函数。它接受任意多个单参函数（只接受一个参数的函数）作为参数，并且返回一个函数。它的作为用：使得类似 f(g(h(a))) 这样的函数调用可以简写为 combo(f, g, h)(a)。
function combo (...funcs) {
  let res = [];
  let args = funcs;
  for(let i = 0; i < args.length;i++) {
     if(typeof args[i]  == 'function') {
      res.push(args[i]);
     } 
  }
  return function (val) {
      res.map((func) => {
        val = func(val)
      })
      return val;
  }
}

/* 以下为测试代码 */
const addOne = a => a + 1
const multiTwo = a => a * 2
const divThree = a => a / 3
const toString = a => a + ''
const split = a => a.split('')

// split(toString(addOne(multiTwo(divThree(666)))))
// => ["4", "4", "5"]

const testForCombo = combo( toString, split, addOne, multiTwo, divThree)
testForCombo(666)
// => ["4", "4", "5"]
// combo(split, toString, addOne, multiTwo, divThree)



// 5 有两个盘子分别放有 5 个和 7 个小球，两个朋友玩游戏：每个人轮流从两个盘子中拿小球，每人每次只能从其中一个盘子中拿，每次可以拿 1 个或者多个（不能一个都不拿），拿到最后一个小球的人算输。问开局先手和后手是否有必胜策略？如果有，请描述必胜策略。


// 答 ：先手必胜，只要保持，两个盘子数量相等，最后一定是先手胜。决胜局位 2 2，这个时候到后手拿，后手必输。