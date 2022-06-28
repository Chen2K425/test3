export default {
    items: [],
    name: 'cart',
    setName(id) {
        this.name = `shop${id}`;
        // items
        const items = sessionStorage.getItem(this.name);
        if (items) {
            this.items = JSON.parse(items);
        } else {
            this.items = [];
        }
    },
    save() {
        const val = JSON.stringify(this.items);
        sessionStorage.setItem(this.name, val);
    },
    search(id) {
        const index = this.items.findIndex(v => {
            return v.id == id;
        });
        return index;
    },

    // 商品追加
    addItem(item) {
        const index = this.search(item.id);
        if (index >= 0) {
            this.items[index].count += item.count;
        } else {
            this.items.push(item);
        }
        this.save();
    },

    // 商品削除
    delItem(id) {
        const index = this.search(id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
        this.save();
    },

    // 数量変更
    changeItemCount(id, count) {
        const index = this.search(id);
        if (index >= 0) {
            this.items[index].count = count;
        }
        this.save();
    },

    // 空
    clearItems() {
        this.items = [];
        this.save();
    }







};
