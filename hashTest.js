  function hashMap(loadFactor, capacity=16) {
  let buckets = [];

  

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }


  function set(key, value) {
    const hashKey = hash(key);
    const pair = { key, value, hashKey };
    if (hashKey < 0 || hashKey >= capacity) {
      throw new Error("Trying to access index out of bounds");
    }
const currentBucket = buckets[hashKey]
    if (buckets[hashKey] != undefined) {
      if (buckets[hashKey].key === key) {
        buckets[hashKey].value = value;
      }else{
      
       try {
        for(let i = 0; i < currentBucket.size()-1; i++){
         
         
         let bucketItem = currentBucket.at(i)
        
         if(bucketItem.key === key){
         
          bucketItem.value = value
        
         }
        
        }
        
       } catch {
       
        
        const newList = linkedList();
        newList.append(buckets[hashKey]);
        newList.append(pair);

        buckets[hashKey] = newList;}

      }
      

    } else {
      buckets[hashKey] = pair;
      
      return pair;
    }
    checkLoadFactor();
  }


  function get(key) {
    let foundValue = null;

    buckets.forEach((bucket) => {
     
        if (bucket.hashKey === undefined) {
          let n = bucket.size() - 1;
          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
        
            bucketObject.key === key ? (foundValue = bucketObject.value) : null;
          }
        }
        if (bucket.key === key) {
          foundValue = bucket.value;
        }

    });

    return foundValue;
  }


  function remove(key) {
    let removedItem = false;
      let matchIndex =false



    buckets.forEach((bucket) => {
    

      if (bucket.hashKey === undefined) {
      
       
          let n = bucket.size() - 1;
           

          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
          
            if(bucketObject.key === key){
              console.log('They Match')
              matchIndex = i
          }
        }       
        if(matchIndex != false){
          bucket.remove(matchIndex)          
          removedItem = true   
        }  
      } else if (bucket.key === key) {
     

        const idx = buckets.findIndex(value => {
         
          if(typeof(value) === 'object'){
            if(value.key === key){
              return value.key
            }
          }})
       
       console.log(logMap())
        buckets.splice(idx,1);
        
console.log(logMap())
        removedItem = true;
       
      }
  
    });

    return removedItem;
  }


  const length = () => {
   let keysLength =[]
    buckets.forEach((bucket) => {
    
        if (bucket.key === undefined) {
          let n = bucket.size() - 1;
          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
          
           keysLength.push(bucketObject.key)
          }
        }
        if(bucket.key != undefined){
        keysLength.push(bucket.key)
        }
        })  
        return keysLength.length
  }


  const clear = () => {
  buckets.splice(0)
  }

  const keys = () => {
    const keysArray = []
    buckets.forEach((bucket) => {
    
        if (bucket.key === undefined) {
          let n = bucket.size() - 1;
          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
          
           keysArray.push(bucketObject.key)
          }
        }
        if(bucket.key != undefined){
        keysArray.push(bucket.key)
        } else if(bucket.key === undefined){
          return
        }
        })  
        return keysArray
  }

    const values = () => {
    const valuesArray = []
    buckets.forEach((bucket) => {
    
        if (bucket.key === undefined) {
          let n = bucket.size() - 1;
          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
          
           valuesArray.push(bucketObject.value)
          }
        }
        if(bucket.value != undefined){
        valuesArray.push(bucket.value)
        }
        })  
        return valuesArray
  }


  const entries = () =>{
    const entriesArray = []
    const getKeys = keys();
    const getValues = values();
    const ln = length();
    for (let n = 0; n<ln; n++){
      const arr = [];
      arr.push(getKeys[n], getValues[n]);
      entriesArray.push(arr)
    }

    return entriesArray
  }

  const checkLoadFactor = () =>{
    const mapLength = length()
    if(mapLength >loadFactor*capacity){
      console.log(`CAPACITY REACHED`)
      capacity = capacity*2
    

    const entriesArray = entries();
    console.log(entriesArray)
    clear()
    entriesArray.forEach(entry =>{
      set(entry[0], entry[1])
      // console.log(entry[0], entry[1])
    })
    }
    console.log(`Load factor: ${loadFactor}`)
    console.log(`Array load: ${mapLength/capacity}`)
    console.log(`Capacity: ${capacity}`)
    return (mapLength >loadFactor*capacity)
  }

  const logMap = () => {
    const mapArray = []
    buckets.forEach(bucket => {
      if(bucket.key === undefined){
        const linkedList = []
        const n = bucket.size() -1
        for (i=0; i<n ; i++){
          
          linkedList.push(bucket.at(i))
         
        }
       mapArray.push(linkedList)
      } else {
        mapArray.push(bucket)
      }

    })
    return mapArray
  }


  return { hash, set, buckets, get, remove, length, clear, keys, values, entries, checkLoadFactor, logMap};
}

const linkedList = () => {
  let n = 0;

  let preNode = node();

  const append = (value) => {
    const newNode = node(value);
    newNode.index = n;
    const current = iterate();

    if (current.next === null) {
      current.next = newNode;
    }
    n++;
    return newNode;
  };

  const iterate = () => {
    let current = preNode;
    while (current.next) {
      current = current.next;
    }
    return current;
  };

  const prepend = (value) => {
    insertAt(value, 0);
  };

  const insertAt = (value, index) => {
    const newNode = node(value);
    newNode.index = index;
    const rightNode = at(index);
    let leftNode = at(index - 1);
    if (leftNode == null) {
      leftNode = preNode;
    }
    let current = newNode;

    leftNode.next = newNode;
    newNode.next = rightNode;

    while (current.next) {
      current = current.next;
      current.index++;
    }
    n++;
  };

  const size = () => n + 1;

  const head = () => {
    const headNode = preNode.next;
    return headNode.value;
  };

  const tail = () => {
    const current = iterate();
    if (current.next === null) {
      const tailNode = current;
      return tailNode;
    }
  };

  const at = (index) => {
    let current = preNode;
    while (current.next) {
      current = current.next;
      if (current.index === index) {
        // const atNode = current;
        return current.value;
      }
    }
  };

  const pop = () => {
    remove(n);
  };

  const remove = (index) => {
    if (index < 0 || index > n) return null;
    let leftNode = at(index - 1);
    let rightNode = at(index + 1);
    if (index != n && index != 0) {
      console.log(`index: ${index}`);
      leftNode.next = rightNode;
    } else if (index === 0) {
      preNode.next = rightNode;
    } else if (index === n) {
      leftNode.next = null;
    }
    let current = rightNode;
    while (current) {
      current.index = current.index - 1;
      current = current.next;
    }
    n--;
  };

  const contains = (value) => {
    let current = preNode;
    while (current.next) {
      current = current.next;
      if (current.value === value) {
        return true;
      }
    }
    return false;
  };

  const find = (value) => {
    let current = preNode;
    while (current.next) {
      current = current.next;
      if (current.value === value) {
        const matchingNode = current;
        return matchingNode.index;
      }
    }
    return null;
  };

  const toString = () => {
    let stringChain = "";
    let current = preNode.next;
    while (current) {
      let nodeValue = current.value;
      stringChain = stringChain.concat(
        `( ${nodeValue} [${current.index}] ) -> `
      );
      if (current.next === null) {
        stringChain = stringChain.concat(null);
      }
      current = current.next;
    }
    console.log(n);
    return stringChain;
  };

  return {
    prepend,
    append,
    toString,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    insertAt,
    remove,
  };
};

const node = (value = null, next = null) => {
  return { value, next };
};

const test = hashMap(.75);



test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");

test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(`Length: ${test.length()}`)
console.log(test.checkLoadFactor())


test.set("carrot", "orange");
console.log(`Length: ${test.length()}`)
 test.set('moon', 'silver')
 console.log(`Length: ${test.length()}`)
 console.log(test.checkLoadFactor())


 test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");

test.set("dog", "brownish");

console.log(`Length: ${test.length()}`)
 console.log(test.checkLoadFactor())
 console.log(test.logMap())



test.set("car","dark-grey")
test.set("jumper", "cream")
test.set("sunset", "magenta")
test.set("tie", "teal");
test.set("shoes", "watermelon");
test.set("mandarin", "blood orange")
test.set("morning", "cyan");
test.set("pride", "rainbow");
test.set("third", "bronze");
test.set("field", "verdant");
test.set("desert","sand");
test.set("water", "aquamarine");

console.log(`Length: ${test.length()}`)
console.log(test.checkLoadFactor())

console.log('----------keys then values----------------')
console.log(test.keys());
console.log(test.values());


console.log('----------ENTRIES----------------')
console.log(test.entries());

console.log(`----------------------LOGMAP------------------`)
console.log(test.logMap())


console.log(`Get apple: ${test.get("apple")}`);

console.log(`get hat: ${test.get("hat")}`);

console.log(`get 'random (not in list) ${test.get("random")}`);
console.log()
console.log(`bucketslength: ${test.buckets.length}`)
console.log(`-------------REMOVALS---------------`)
console.log(`1 -- KITE`)
console.log(`removing 'kite: ${test.remove("kite")}`);
console.log(`<<<<<<<<<<<<<kite gone>>>>>>>>>>>>>>>>>`)
console.log(`Get KITE: ${test.get("kite")}`)
console.log()
console.log(`bucketslength: ${test.buckets.length}`)

console.log(`Get dog: ${test.get("dog")}`)
console.log(`Removing dog: ${test.remove("dog")}`)

console.log(`Get dog: ${test.get("dog")}`)
console.log()
console.log(`----------------------------`)
console.log(test.logMap())
console.log(`bucketslength: ${test.length()}`)

console.log(test.checkLoadFactor())

console.log(`Removing Lion: ${test.remove('lion')}`)
console.log('----------keys then values----------------')
console.log(test.keys());
console.log(test.values());
console.log(`Length: ${test.length()}`)

console.log(`Clearing: ${test.clear()}`)
console.log('----------BUCKETS----------------')
console.log(`buckets: ${test.buckets}`);
console.log(`Length: ${test.length()}`)
console.log('----------keys then values----------------')
console.log(test.keys());
console.log(test.values());
console.log(test.logMap())



