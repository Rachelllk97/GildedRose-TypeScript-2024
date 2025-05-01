export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

  export enum specialItems {
    AGED_BRIE = 'Aged Brie',
    BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
    SULFURAS = 'Sulfuras, Hand of Ragnaros'
  }
  export class GildedRose {

  sulfarusUpdate(item) {
      return item.quality
    }

   agedBrieUpdate(item) {
    if (item.quality < 50) {
      item.quality ++
    }
    return item.quality
   }

   backstagePassesUpdate(item) {
    if (item.quality < 50 && item.sellIn > 11) {
      item.quality ++
    }
    else if (item.quality < 49 && item.sellIn < 11 && item.sellIn > 5) {
      item.quality += 2
    }
    else if (item.quality < 48 && item.sellIn < 6 && item.sellIn > 0) {
      item.quality += 3
    }
    else if(item.sellIn < 0){
      item.quality = 0
    }
    return item.quality
   }

   otherItemsUpdate(item) {
    if (item.sellIn > 0 && item.quality > 0) {
      item.quality--
    } else if (item.sellIn < 0 && item.quality > 0) {
      if (item.quality > 1) {
        item.quality--
      }
      item.quality--
    }
    return item.quality
   }

  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {

    for (let i = 0; i < this.items.length; i++) {
      if(this.items[i].name === specialItems.SULFURAS){
        this.sulfarusUpdate(this.items[i])
        break;
      }else if(this.items[i].name === specialItems.AGED_BRIE) {
        this.agedBrieUpdate(this.items[i])
        break;
      }
      else if (this.items[i].name === specialItems.BACKSTAGE_PASSES){
        this.backstagePassesUpdate(this.items[i])
        break;
      } else {
        this.otherItemsUpdate(this.items[i])
      }
    }
  

    return this.items;
  }
}