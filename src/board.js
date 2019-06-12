class Board {
  populate(rows, columns) {
    this.rowCount = rows;
    this.columnCount = columns;

    let colours = ["red", "green", "yellow", "blue"];
    this.cells = [];
    for (let iRow = 0; iRow < rows; iRow++) {
      for (let iColumn = 0; iColumn < columns; iColumn++) {
        this.cells.push(
          new Cell(
            iColumn,
            iRow,
            colours[Math.floor(Math.random() * Math.floor(4))]
          )
        );
      }
    }
    this.canGo = this.IsRemovePossible();
  }

  removeBlock(cell) {
    let block = this.sameColourBlock(cell);
    if (block.length <= 1) {
      return 0;
    }

    this.cells = this.cells.filter(cell => !block.includes(cell));
    block = block.sort((a, b) => {
      return a.y - b.y;
    });

    block.forEach(cell => {
      var cellsAbove = this.cells.filter(above => {
        return above.x === cell.x && above.y < cell.y;
      });

      cellsAbove.forEach(cell => {
        cell.y++;
      });
    });

    this.canGo = this.IsRemovePossible();
    return block.length * block.length - 1;
  }

  IsRemovePossible() {
    let moves = this.cells.filter(cell => {
      return this.sameColourBlock(cell).length > 1;
    });

    if (moves.length > 0) {
      return true;
    }
    return false;
  }

  sameColourBlock(cell) {
    return this.searchSurrounding(cell, [cell]);
  }

  searchSurrounding(cell, found) {
    let surroundingCells = this.filterArray(
      found,
      this.surroundingCellsSameColour(cell)
    );

    this.addToArray(found, surroundingCells);

    surroundingCells.forEach(surroundingCell => {
      let surroundingBlock = this.filterArray(
        found,
        this.searchSurrounding(surroundingCell, found)
      );
      this.addToArray(found, surroundingBlock);
    });
    return found;
  }

  filterArray(arr, items) {
    let filtered = [];
    items.forEach(element => {
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].x === element.x && arr[i].y === element.y) {
          found = true;
          break;
        }
      }

      if (!found) {
        filtered.push(element);
      }
    });

    return filtered;
  }

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

  addToArray(arr, items) {
    items.forEach(item => {
      if (arr.indexOf(item) === -1) {
        arr.push(item);
      }
    });
  }

  surroundingCellsSameColour(cell) {
    let matches = [];
    let surroundingCells = this.surroundingCells(cell);

    surroundingCells.forEach(surroundingCell => {
      if (cell.colour === surroundingCell.colour) {
        matches.push(surroundingCell);
        console.log("surroundingCell:" + surroundingCell);
      }
    });
    return matches;
  }

  surroundingCells(cell) {
    let cells = [];

    if (cell.x > 0) {
      let top = this.findCell(cell.x - 1, cell.y);
      if (top != null) {
        cells.push(top);
      }
    }

    if (cell.x < this.columnCount - 1) {
      let bottom = this.findCell(cell.x + 1, cell.y);
      if (bottom != null) {
        cells.push(bottom);
      }
    }

    if (cell.y > 0) {
      let left = this.findCell(cell.x, cell.y - 1);
      if (left != null) {
        cells.push(left);
      }
    }

    if (cell.y < this.rowCount - 1) {
      let right = this.findCell(cell.x, cell.y + 1);
      if (right != null) {
        cells.push(right);
      }
    }
    return cells;
  }

  findCell(x, y) {
    let filtered = this.cells.filter(cell => {
      return cell.x === x && cell.y === y;
    });

    return filtered[0];
  }
}
