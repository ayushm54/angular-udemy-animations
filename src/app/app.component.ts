import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      // it indicated the transition effect from normal to highlighted state
      // and the animation should take 300 ms
      // transition('normal => highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))

      // if we want same animation in transtion from both states use below
      transition('normal <=> highlighted', animate(500))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      // transition from shrunken to any state and vice verca with help of wildcard
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
      ]),
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // void is a reserved state name
      // here when element is not in list the state would be void
      // we could also used * as start state
      // when using void we need to use the array structure
      // and define a style first before animate
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(100px)'
        }), // this would be the initial style assigned by angular in case of void
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        // with keyframe we could divide the animation interval and
        // apply different styles at different part of the animation duration
        // offset defines at wich part of the animation duration the style should apply
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0 // this style would apply at the start of animation
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3 // this style would apply at 300ms
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8 // this style would apply at 800ms
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1 // this style would apply at 1000ms
          })
        ]))
      ]),
      transition('* => void', [
        // with group method we could perform two or more animations simultaneously
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAdd(item): void{
    this.list.push(item);
  }

  onAnimate(): void{
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink(): void{
    this.wildState = 'shrunken';
  }

  onDelete(item): void{
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event): void {
    console.log(event);
  }

  animationDone(event): void {
    console.log(event);
  }

}
