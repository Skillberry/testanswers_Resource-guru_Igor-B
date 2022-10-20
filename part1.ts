const testArr = [ 'ssdf', [ 2, [ 3, [ 5, ] ] ], [ 4, ] ];
function flattening(arr: Array<any>): Array<any> {
  const acc: any[] = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      const res = flattening(item);
      acc.push(...res);
    } else {
      acc.push(item);
    }
})
return acc; }
console.log(flattening(testArr));
