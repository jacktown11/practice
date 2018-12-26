(function(){
    const params = {
        numOfPieces: 8
    };

    // 该对象提供一些棋子位置对折、旋转的变换方法
    let arrayHandler = {
        wrapHorizonal: function(arr){
            let height = params.numOfPieces;
            arr.forEach((item, index, arr) => {
                arr[index] = height - 1 - item;
            });
            return arr;
        },
        wrapVertical: function(arr){
            return arr.reverse();
        },
        rotate90: function(arr){
            let height = params.numOfPieces;
            arr.concat().forEach((item, index) => {
                arr[item] = height - 1 - index;
            });
            return arr;
        },
        rotate180: function(arr){
            return this.rotate90(this.rotate90(arr));
        },
        rotate270: function(arr){
            return this.rotate90(this.rotate180(arr));
        },
        wrapRightDown: function(arr){
            return this.wrapVertical(this.rotate90(arr));
        },
        wrapLeftDown: function(arr){
            return this.wrapHorizonal(this.rotate90(arr));
        }
    };

    // N*N棋盘上N皇后问题的任意一个解被表示为一个N元数组A，A[i]为第i行的唯一一个棋子的纵坐标(0<=i<=N,0<=A[i]<=N)
    // solver对象是问题求解器，算法基本思路是暴力遍历一个N（棋子数目）元集合的全排列
    // 从全排列中筛选出所有解以后，将可以通过翻转、旋转变换相互得到的两个解认为是相同的，那么可以进一步筛除重复解
    let solver = {
        solutions: [],
        getSolutions: function(){
            let solutions = this.solutions,
                self = this;
            let start = new Array(params.numOfPieces);
            for(let i = start.length-1; i>=0; i--){
                start[i] = i;
            }
            this.walk([], start, function(assumption){
                if(self.isSolution(assumption)){
                    solutions.push(assumption);
                }
            });
        },
        isSolution: function(assumption){
            let add = [],
                minus = [];
            const len = assumption.length;
            assumption.forEach((item, index) => {
                add.push(item+index);
                minus.push(item-index);
            });
            return this.isUnique(add) && this.isUnique(minus);
        },
        isUnique: (arr) => arr.every((item, index, arr) => {
                return index == arr.lastIndexOf(item);
            }),
        walk: function (arr1, arr2, func){
            if(arr2.length > 0){
                let arr2Tmp = arr2.concat(),
                    next = arr2Tmp.shift();
                let arr = arr1.concat();
                arr.push(next);
                this.walk(arr, arr2Tmp, func);
                for(let i = 0, len = arr1.length; i<len; i++){
                    arr = arr1.concat();
                    arr.splice(i, 0, next);
                    this.walk(arr, arr2Tmp, func);
                }
            }else{
                func(arr1);
            }
        },
        simplifySolutions: function(){
            let self = this;
            let solutions = this.solutions;
            solutions.filter(function(solution, index, arr){
                let isSimilar = self.isSimilar;
                let similars = [];    //所有与solution相似的数组（折叠、旋转）
                for (let func in arrayHandler) {
                    if (typeof arrayHandler[func] === 'function') {
                        similars.push(arrayHandler[func](solution.concat()));
                    }
                }
                let i = index + 1;
                while(i < arr.length){
                    let isSimilar = similars.some(function (similarArr) {
                        return arr[i].every(function (item, index, arr) {
                            return item === similarArr[index];
                        });
                    });
                    if(isSimilar){
                        arr.splice(i, 1);
                    }else{
                        i++;
                    }
                }
            });
        }
    };

    // 结果绘制
    let drawer = { 
        drawSolutions: function(solutions){
            let frag = document.createDocumentFragment();
            solutions.forEach(solution => {
                frag.appendChild(this.drawOneSolution(solution));
            });

            let container = document.getElementsByClassName('solution-diagram')[0];
            container.appendChild(frag);

            let totalCount = document.getElementsByClassName('total-count')[0];
            totalCount.innerHTML = solutions.length;
        },
        drawOneSolution: function(solution){
            const numOfPieces = params.numOfPieces;
            let table = document.createElement('table');
            for(let i = 0; i < numOfPieces; i++){
                var tr = document.createElement('tr');
                for(let j = 0; j < numOfPieces; j++){
                    var td = document.createElement('td');
                    if(j == solution[i]){
                        td.className = 'selected';
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            return table;
        }
    };

    window.onload = function(){
        solver.getSolutions();
        solver.simplifySolutions();
        drawer.drawSolutions(solver.solutions);
    };

})();
