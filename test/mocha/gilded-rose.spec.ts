import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';
import {specialItems} from '@/gilded-rose';


describe('Gilded Rose - Quality tests', () => {
  it('should foo', () => {
        //given
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
       //when
    const items = gildedRose.updateQuality();
        //then
    expect(items[0].name).to.equal('foo');
  });
  it('checks if normal items quality is decreased', () => {
      //given
    const initialQuality = 10
    const gildedRose = new GildedRose([new Item('milk', 1, initialQuality)])
      //when
    const items = gildedRose.updateQuality();
     //then
    expect(items[0].quality).to.equal(initialQuality - 1)
  })
  it('once a sellby date has passed the quality degrades twice as fast', () => {
    const initialQuality = 10
    const gildedRose= new GildedRose([new Item('milk', -1, initialQuality)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(initialQuality - 2)
  })
  it('once a sellby date has passed the quality degrades twice as fast but must never drop below 0', () => {
    const initialQuality = 2
    const gildedRose= new GildedRose([new Item('milk', -1, initialQuality)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(initialQuality - 2)
  })
  it('once a sellby date has passed the quality degrades twice as fast but must never drop below 0, even if quality is 1', () => {
    const initialQuality = 1
    const gildedRose= new GildedRose([new Item('milk', -1, initialQuality)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(initialQuality - 1)
  })
  it('checks Sulfuras, Hand of Ragnaros never changes in quality', () => {
    const gildedRose = new GildedRose([new Item(specialItems.SULFURAS, 1, 80)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80)
  })
  it('checks that Aged Brie increases in quality', () => {
    const gildedRose= new GildedRose([new Item(specialItems.AGED_BRIE, 1, 45)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(46)
  })
  it('checks that Aged Brie quality does not go above 50', () => {
    const gildedRose= new GildedRose([new Item(specialItems.AGED_BRIE, 1, 50)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50)
  })
  it('checks that the Backstage passes increase by 2 when there are 10 days or less', () => {
    const gildedRose= new GildedRose([new Item(specialItems.BACKSTAGE_PASSES, 10, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12)
  })
  it('checks that the Backstage passes increase by 3 when there are 5 days or less', () => {
    const gildedRose= new GildedRose([new Item(specialItems.BACKSTAGE_PASSES, 5, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13)
  })
  it('checks that the Backstage passes drops to 0 after the concert has passed', () => {
    const gildedRose= new GildedRose([new Item(specialItems.BACKSTAGE_PASSES, -1, 1)])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0)
  })
});

