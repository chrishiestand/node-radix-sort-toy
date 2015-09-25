#!/usr/bin/env node

import * as _Lodash from 'lodash';

"use strict";

let input = [492,1913,22,39,2,2023,9491,2933,0];

function make_bucket(width = 10) {
    let range = _Lodash.range(width);
    return _Lodash.zipObject(range, []);
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function calculate_rounds(max) {
    let rounds = 1;
    while (max % Math.pow(10, rounds) !== max) {
        rounds++;
    }
    return rounds;
}

function insert_item_M(bucket, item, round) {
    let slot = get_bucket_slot(item, round);
    if (!bucket[slot]) {
        bucket[slot] = [item];
    }
    else {
        bucket[slot].push(item);
    }
    return bucket;
}

function get_bucket_slot(item, round) {
    let modulo  = Math.pow(10, round);
    let divisor = modulo / 10;
    let slot    = Math.floor((item % modulo) / divisor);
    // console.log(`item: ${item}, round: ${round}, slot: ${slot}`);
    return slot;
}

function bucket_to_list(bucket) {
    return _Lodash.filter(
                    _Lodash.flatten(_Lodash.values(bucket)),
                    (a) => { return a !== undefined; }
    );
}

function radix_sort(tosort) {
    let max        = getMaxOfArray(tosort);
    let num_rounds = calculate_rounds(max);
    let bucket1    = make_bucket(10);
    let bucket2;

    for (let i = 1; i <= num_rounds; i++ ) {

        bucket2 = make_bucket(10);

        let sortme = tosort;
        if (i > 1) {
            sortme = bucket_to_list(bucket1);
        }

        sortme.forEach((item,index) => {
            insert_item_M(bucket2, item, i);
        });

        bucket1 = bucket2;
    }
    return bucket_to_list(bucket1);
}

console.log(radix_sort(input));
