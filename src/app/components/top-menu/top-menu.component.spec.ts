import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatLegacyButtonHarness as MatButtonHarness } from '@angular/material/legacy-button/testing';
import { MatLegacyMenuHarness as MatMenuHarness } from '@angular/material/legacy-menu/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TopMenuComponent } from './top-menu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopMenuComponent', () => {
  let component: TopMenuComponent;
  let fixture: ComponentFixture<TopMenuComponent>;
  let loader: HarnessLoader;
  let buttonHarness = MatButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatButtonModule, MatMenuModule, NoopAnimationsModule, RouterTestingModule ],
      declarations: [ TopMenuComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('MatButtons', () => {
    it('should load all button harnesses', async () => {
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons.length).toBe(4);
    });

    it('should load button with exact text "Coffees"', async () => {
      const buttons = await loader.getAllHarnesses(buttonHarness.with({text: 'Coffees'}));
      expect(buttons.length).toBe(1);
      expect(await buttons[0].getText()).toBe('Coffees');
    });
  })

  describe('MatMenus', () => {
    it('should load all menu harnesses', async () => {
      const menues = await loader.getAllHarnesses(MatMenuHarness);
      expect(menues.length).toBe(2);
    });

    it('should get disabled state', async () => {
      const [enabledMenu, disabledMenu] = await loader.getAllHarnesses(MatMenuHarness);
      expect(await enabledMenu.isDisabled()).toBe(false);
      // expect(disabledMenu).toBeUndefined();
    });

    it('should get menu text', async () => {
      const [firstMenu] = await loader.getAllHarnesses(MatMenuHarness);
      expect(await firstMenu.getTriggerText()).toBe('Menu');
    });

    it('should open and close', async () => {
      const menu = await loader.getHarness(MatMenuHarness.with({triggerText: 'Menu'}));
      expect(await menu.isOpen()).toBe(false);
      await menu.open();
      expect(await menu.isOpen()).toBe(true);
      await menu.close();
      expect(await menu.isOpen()).toBe(false);
    });

    it('should get all items', async () => {
      const menu = await loader.getHarness(MatMenuHarness.with({triggerText: 'Menu'}));
      await menu.open();
      expect((await menu.getItems()).length).toBe(2);
    });
  })
});
