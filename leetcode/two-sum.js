/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
*/
var twoSum = function(nums, target) {
    const set = new Set();

    set.add(target - nums[0]);
    
    for(let i=1; i < nums.length; i++) {
        if (set.has(nums[i])){
            const index1 = nums.indexOf(target-nums[i]);
            return [index1, i]
        } else {
            set.add(target - nums[i]);
        }
    }
};

console.log('twoSum([1,3, 10, 4, 5]', twoSum([1,3, 10, 4, 5], 7)) // [ 1, 3 ]