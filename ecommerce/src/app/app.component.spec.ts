import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DefButtonComponent } from './components/dif/def-button/def-button.component';
import { FooterComponent } from './components/dif/footer/footer.component';
import { HeaderComponent } from './components/dif/header/header.component';
import { InputContainerComponent } from './components/dif/input-container/input-container.component';
import { InputValidationComponent } from './components/dif/input-validation/input-validation.component';
import { LoadingComponent } from './components/dif/loading/loading.component';
import { MapComponent } from './components/dif/map/map.component';
import { NotFoundComponent } from './components/dif/not-found/not-found.component';
import { OrderItemsListComponent } from './components/dif/order-items-list/order-items-list.component';
import { PaypalButtonComponent } from './components/dif/paypal-button/paypal-button.component';
import { SearchComponent } from './components/dif/search/search.component';
import { TagsComponent } from './components/dif/tags/tags.component';
import { TextInputComponent } from './components/dif/text-input/text-input.component';
import { TitleComponent } from './components/dif/title/title.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { WatchPageComponent } from './components/pages/watch-page/watch-page.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    WatchPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackComponent,
    FooterComponent,
    HomePageComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ecommerce'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ecommerce');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('watch ecommerce app is running!');
  });
});
