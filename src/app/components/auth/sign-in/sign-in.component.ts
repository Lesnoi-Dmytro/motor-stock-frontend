import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { PopUpService } from '@services/pop-up/pop-up.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly authService = inject(AuthService);
  private readonly popUpService = inject(PopUpService);
  private readonly router = inject(Router);

  public form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      // asyncValidators: [(control) => this.isEmailAvailable(control)],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public readonly showPassword = signal<boolean>(false);
  public readonly isLoading = signal<boolean>(false);

  public onTogglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.authService
      .signIn(this.form.value.email!, this.form.value.password!)
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.popUpService.openSuccessPopUp('Sign in successful');
          this.router.navigate(['/']);
        },
        error: (error: unknown) => {
          this.isLoading.set(false);
          if (
            error instanceof HttpErrorResponse &&
            error.error.message === 'Invalid credentials'
          ) {
            this.popUpService.openErrorPopUp('Invalid credentials');
          } else {
            this.popUpService.openErrorPopUp('An error occured during sign in');
          }
        },
      });
  }

  public get emailErrorMessage() {
    const emailControl = this.form.controls.email;
    if (emailControl.hasError('required')) {
      return 'Email is required';
    } else if (emailControl.hasError('email')) {
      return 'Invalid email';
    } else if (emailControl.hasError('emailNotAvailable')) {
      return 'Email is not available';
    }
    return '';
  }

  public get passwordErrorMessage() {
    const passwordControl = this.form.controls.password;
    if (passwordControl.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }

  // private isEmailAvailable(control: AbstractControl<string>) {
  //   return of(control.value).pipe(
  //     delay(500),
  //     distinctUntilChanged(),
  //     switchMap((email) => {
  //       this.emailValidationLoading.set(true);

  //       return this.authService.isEmailAvailable(email).pipe(
  //         map((response) => {
  //           this.emailValidationLoading.set(false);
  //           return response.available ? null : { emailNotAvailable: true };
  //         }),
  //         catchError(() => {
  //           this.emailValidationLoading.set(false);
  //           return of({ emailNotAvailable: true });
  //         })
  //       );
  //     })
  //   );
  // }
}
