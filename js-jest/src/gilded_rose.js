class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const sulfuras = 'Sulfuras, Hand of Ragnaros';
const brie = 'Aged Brie';
const backstage = 'Backstage passes to a TAFKAL80ETC concert';

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let item of this.items){

      if (item.name == sulfuras) continue;

      if (item.name != brie && item.name != backstage) {
        this.adjustQuality(item, -1)
      } else {
        this.adjustQuality(item, 1)
        if (item.name == backstage) {
          if (item.sellIn < 11) {
            this.adjustQuality(item, 1)
          }
          if (item.sellIn < 6) {
            this.adjustQuality(item, 1)
          }
        }
      }

      item.sellIn --;

      if (item.sellIn < 0) {
        if (item.name != brie) {
          if (item.name != backstage) {
            this.adjustQuality(item, -1)
          } else {
            this.adjustQuality(item, -item.quality)
          }
        } else {
          this.adjustQuality(item, 1)
        }
      }
      

    }

    return this.items;
  }

  adjustQuality(item, amount) {
    if (item.quality >= 50 || item.quality <= 0) {
      return;
    } 

    item.quality = item.quality + amount;
  }

}

module.exports = {
  Item,
  Shop
}
