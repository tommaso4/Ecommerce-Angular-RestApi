import { WhishlistService } from '../../services/whishlist.service';
import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IwishListItem } from '../../Modules/iwishListItem';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent {

  Whishlist: IwishListItem[] = [];

  constructor(
    private logSystem: LogSystemService,
    private whishlistService: WhishlistService,
  ) {}

  ngOnInit(){
    this.getWhishlist()
  }

  getWhishlist(){
    this.logSystem.user$.subscribe((accessData) => {
      if (!accessData?.user.id) {
        return;
      }
      this.whishlistService.getWishlist(Number(accessData.user.id)).subscribe((items) => {
        this.Whishlist = items;
      });
    });
  }

  removeBerrWish(beerid?: number) {
    this.whishlistService.removeWish(beerid).subscribe(() => {
      this.Whishlist = this.Whishlist.filter(item => item.beerId !== beerid);
      this.getWhishlist()
    });
  }

}
