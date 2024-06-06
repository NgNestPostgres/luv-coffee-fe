import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeManagerService } from '@core/services/theme-manager.service';

import { ThemeManagerComponent } from './theme-manager.component';

class MockThemeManagerService {
  changeTheme = () => {};
}

describe('ThemeToggleComponent', () => {
  let component: ThemeManagerComponent;
  let fixture: ComponentFixture<ThemeManagerComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        NoopAnimationsModule
      ],
      declarations: [ThemeManagerComponent],
      providers: [
        { provide: ThemeManagerService, useClass: MockThemeManagerService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create component', async () => {
    await loader.getHarness(MatMenuHarness);
    expect(component).toBeTruthy();
  });

  describe('MatMenuModule', () => {
    it('should load menu harnesses', async () => {
      const menues = await loader.getAllHarnesses(MatMenuHarness);
      expect(menues.length).toBe(1);
    });

    it('should get disabled state', async () => {
      const enabledMenu = await loader.getHarness(MatMenuHarness);
      expect(await enabledMenu.isDisabled()).toBe(false);
    });

    it('should open and close', async () => {
      const menu = await loader.getHarness(MatMenuHarness);
      expect(await menu.isOpen()).toBe(false);
      await menu.open();
      expect(await menu.isOpen()).toBe(true);
      await menu.close();
      expect(await menu.isOpen()).toBe(false);
    });

    it('should get all items', async () => {
      const menu = await loader.getHarness(MatMenuHarness);
      await menu.open();
      expect((await menu.getItems()).length).toBe(3);
    });

    it('shoud click all items', async () => {
      spyOn(component['themeManager'], 'changeTheme');

      const menu = await loader.getHarness(MatMenuHarness);
      await menu.open();
      const [firstItem, secondItem, thirdItem] = await menu.getItems();
      await firstItem.click();
      await secondItem.click();
      await thirdItem.click();

      expect(component['themeManager'].changeTheme).toHaveBeenCalledTimes(3);
    });
  });
});
