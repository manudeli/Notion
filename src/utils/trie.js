class Node {
  constructor(value) {
    this.value = value;
    this.isTarget = false;
    this.children = {};
  }
}

export class Trie {
  constructor() {
    this.root = new Node('');
  }

  insert(string, id) {
    let currentNode = this.root;

    string += ` - Document ID: ${id}`;
    string.split('').forEach((char, index) => {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new Node();
        currentNode.children[char].value = currentNode.value + char;
      }
      currentNode = currentNode.children[char];
      if (index === string.length - 1) {
        currentNode.isTarget = true;
      }
    });
  }

  autocomplete(string) {
    if (typeof string !== 'string' || !string)
      return console.log('적절한 입력이 아닙니다.');

    const result = [];
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children[char]) {
        return console.log(`${string}은 예상 검색어에 없습니다.`);
      }
      currentNode = currentNode.children[char];
    }

    const queue = [];
    queue.push(currentNode);

    // console.log(queue);
    // console.log(JSON.stringify(queue));
    while (queue.length) {
      currentNode = queue.shift();
      if (currentNode.isTarget) {
        result.push(currentNode.value);
      }

      Object.keys(currentNode.children).forEach((key) => {
        queue.push(currentNode.children[key]);
      });
    }

    return result;
  }
}

// 사용법
const trie = new Trie();
trie.insert('cat');
trie.insert('catch');
trie.insert('can');
trie.insert('cob');
trie.insert('사과');
trie.insert('사과합니다');
trie.insert('사랑해');
trie.insert('사이가');

trie.autocomplete('cat');
