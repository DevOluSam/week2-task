
export default findDuplicateTransactions;



function findDuplicateTransactions(transactions) {
    const outputGroups = new Map();
  
    transactions.forEach((transaction1, i) => {
        transactions.slice(i + 1).forEach((transaction2) => {
            if (
                transaction1.sourceAccount === transaction2.sourceAccount &&
                transaction1.targetAccount === transaction2.targetAccount &&
                transaction1.amount === transaction2.amount &&
                transaction1.category === transaction2.category &&
                Math.abs(new Date(transaction1.time) - new Date(transaction2.time)) <= 60000
            ) {
                const groupKey = `${transaction1.sourceAccount}-${transaction1.targetAccount}-${transaction1.amount}-${transaction1.category}`;
                if (!outputGroups.has(groupKey)) {
                    outputGroups.set(groupKey, [transaction1]);
                }
                outputGroups.get(groupKey).push(transaction2);
            }
        });
    });
  
    // Convert Map values (groups) to an array, sort, and return
    const sortedOutputGroups = Array.from(outputGroups.values()).sort(
        (group1, group2) => new Date(group1[0].time) - new Date(group2[0].time)
    );
  
    return sortedOutputGroups;
  }


