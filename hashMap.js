 function hashMap(loadFactory, capacity){
  let buckets = []
  buckets.length = 16
 
 function hash(key) {
   let hashCode = 0;
      
   const primeNumber = 31;
   for (let i = 0; i < key.length; i++) {
     hashCode = (primeNumber * hashCode + key.charCodeAt(i))%16;
   }

   return hashCode;
 }



function set(key,value) {
  const hashKey = hash(key)
   const pair = {key, value, hashKey}
   if (hashKey < 0 || hashKey>= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}

  if(buckets[hashKey] != undefined) {
    if(buckets[hashKey].key === key){
      console.group(buckets[hashKey])
      buckets[hashKey].value = value
    } else {
      const newList = linkedList();
      newList.append(buckets[hashKey])
      newList.append(pair);
     
      buckets[hashKey] = newList

     console.log(hashKey)
      console.log(newList.at(0))
      console.log(newList.at(1))

    }
  } else {
 
  buckets[hashKey] = pair
  
  return pair
  }
}


function get(key) {
  // for (const [key, value] of Object.entries(buckets)){
  //   console.log(`key: ${key}, value: ${value}`)
  // }


 buckets.forEach(bucket => {
    const bucketIndex = bucket.hashKey;
    const bucketValue = bucket.value;
    const bucketKey = bucket.key;
    // console.log(bucketIndex, bucketKey, bucketValue)
    console.log(bucketKey)

    console.log(key)
    console.log(`typeofs: ${typeof(key)}, ${typeof(bucketKey)}`)
    
    bucket.find(bucketKey===key)
    
    if(bucketKey === key){
      console.log("found! "+bucketKey);
    } else {
      return bucketKey+", "+bucketValue+", "+bucketIndex
    }
    // console.log(`${bucket.hashKey},${bucket.key}, ${bucket.value}`)})


  //  bucketValues.find(key);

})


}
  // buckets.forEach(bucket => console.log(`Keys: ${Object.keys(bucket)}`))
  // buckets.forEach(bucket => console.log(`Values: ${Object.values(bucket)}`))


// return buckets.find(bucket => 
//   bucket.value.key === key)










 return {hash, set, buckets, get}
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
    n++
  };


  const size = () => n+1;


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


  const pop = () =>{
    remove(n)
  }


  const remove = (index) => {
    if(index<0 ||index >n) return null
    let leftNode = at(index - 1);
    let rightNode = at(index + 1);
    if (index != n && index !=0) {
      
      console.log(`index: ${index}`);
      leftNode.next = rightNode;
      
    } else if(index===0){
      preNode.next = rightNode
    }
    else if(index===n) {
      leftNode.next = null;
     
    }
    let current = rightNode;
      while (current) {
        current.index = current.index - 1;
        current = current.next;
      
    }
    n--
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
    console.log(n)
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



 
 
 
 
 
 
 
 
 
 
 const test = hashMap()

//  test.hash("Allyn"));
//  test.hash("Smith"));
//  test.hash("Lenore"));
// // console.log(test.hash("Braithwaite"));
//  test.hash("Williams"));

 test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
   
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')
//  test.set('elephant', 'huge')

//  console.log('----------BUCKETS----------------')
//  console.log(test.buckets)

 console.log('------------KEYS---------------')
 console.log(test.get('apple'))


