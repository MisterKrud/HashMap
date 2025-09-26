  function hashMap(loadFactor, capacity) {
  let buckets = [];
  buckets.length = 16;
  let l=0

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }


  function set(key, value) {
    const hashKey = hash(key);
    const pair = { key, value, hashKey };
    if (hashKey < 0 || hashKey >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (buckets[hashKey] != undefined) {
      if (buckets[hashKey].key === key) {
        console.group(buckets[hashKey]);
        buckets[hashKey].value = value;
      } else {
        const newList = linkedList();
        newList.append(buckets[hashKey]);
        newList.append(pair);

        buckets[hashKey] = newList;

        console.log(hashKey);
        console.log(newList.at(0));
        console.log(newList.at(1));
      }
      l++
    } else {
      buckets[hashKey] = pair;
      l++
      return pair;
    }
  }


  function get(key) {
    let foundValue = null;

    buckets.forEach((bucket) => {
      // if (typeof (bucket === "object")) {
        if (bucket.hashKey === undefined) {
          let n = bucket.size() - 1;
          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
            // console.log(bucketObject)
            bucketObject.key === key ? (foundValue = bucketObject.value) : null;
          }
        }
        if (bucket.key === key) {
          foundValue = bucket.value;
        }
      // }
    });

    return foundValue;
  }


  function remove(key) {
    let removedItem = false;
      let matchIndex =false
    buckets.forEach((bucket) => {
      // if (typeof (bucket === "object")) {

      if (bucket.hashKey === undefined) {
          let n = bucket.size() - 1;
          
          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
          
            if(bucketObject.key === key){
              // console.log('They Match')
              matchIndex = i
          }
        }       
          bucket.remove(matchIndex)          
          removedItem = true     
      }
      

      if (bucket.key === key) {
        buckets.splice(bucket.hashKey, bucket.hashKey + 1);
        removedItem = true;
      }
    // }
    });
l--
    return removedItem;
  }


  const length = () => {
   let keysLength =[]
    buckets.forEach((bucket) => {
    
        if (bucket.hashKey === undefined) {
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
  l=0
  }

  const keys = () => {
    const keysArray = []
    buckets.forEach((bucket) => {
    
        if (bucket.hashKey === undefined) {
          let n = bucket.size() - 1;
          for (let i = 0; i < n; i++) {
            const bucketObject = bucket.at(i);
          
           keysArray.push(bucketObject.key)
          }
        }
        if(bucket.key != undefined){
        keysArray.push(bucket.key)
        }
        })  
        return keysArray
  }

    const values = () => {
    const valuesArray = []
    buckets.forEach((bucket) => {
    
        if (bucket.hashKey === undefined) {
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


  return { hash, set, buckets, get, remove, length, clear, keys, values, entries};
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

const test = hashMap();



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
console.log('----------keys then values----------------')
console.log(test.keys());
console.log(test.values());

console.log('----------ENTRIES----------------')
console.log(test.entries());


console.log(`Get apple: ${test.get("apple")}`);

console.log(`get hat: ${test.get("hat")}`);

console.log(`get 'random (not in list) ${test.get("random")}`);
console.log(`removing 'kite: ${test.remove("kite")}`);

console.log(`Removing dog: ${test.remove("dog")}`)

console.log(`Get dog: ${test.get("dog")}`)

console.log(`Removing Lion: ${test.remove('lion')}`)
console.log('----------keys then values----------------')
console.log(test.keys());
console.log(test.values());
console.log(`Length: ${test.length()}`)

console.log(`Clearing: ${test.clear()}`)
console.log('----------BUCKETS----------------')
console.log(`buckets: ${test.buckets}`);
console.log(`Length: ${test.length()}`)

// console.log(test.remove("kite"));
