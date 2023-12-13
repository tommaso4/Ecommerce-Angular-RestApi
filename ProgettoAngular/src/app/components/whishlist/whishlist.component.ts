import { WhishlistService } from './whishlist.service';
import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IwishListItem } from '../../Modules/iwishListItem';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.scss'
})
export class WhishlistComponent {

  Whishlist:IwishListItem[] = [];

  constructor(
    private logSystem: LogSystemService,
    private whishlistService: WhishlistService) {}

ngOnInit(): void {
    this.logSystem.user$.subscribe((accessData)=>{
      if(!accessData?.user.id){
        return;

      }
      this.whishlistService.getWishlist(accessData.user.id).subscribe((items)=>{
        this.Whishlist = items;
      })

    })







}
}
