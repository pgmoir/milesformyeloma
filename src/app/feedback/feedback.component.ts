import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnDestroy {
  private userSubscription: Subscription;

  comments: string;
  email: string;
  thanks: string;

  feedback: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.userSubscription = this.authService.user.subscribe(
      (user) => {
        // console.log('feedback', user);
        this.feedback = db.list('feedback', { query: { limitToLast: 1 } });
        this.email = this.authService.email;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    // console.log('feedback destroy');
  }

  submitFeedback() {
    const fb = {
      comments: this.comments,
      email: this.email
    };
    this.feedback.push(fb)
      .then(
        (any) => {
          this.comments = '';
          this.thanks = 'Thank you very much for the feedback and your support for The Basil Skyers Myeloma Foundation.';
        }
      );
  }
}
