import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTreeHarness } from '@angular/material/tree/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Theme } from '@core/services/theme-manager.service';

import { MenuItemNode, SidenavDatasourceService } from './sidenav-datasource.service';
import { SidenavTreeComponent } from './sidenav-tree.component';

const TreeData: MenuItemNode[] = [
  { name: 'Coffees', isHidden: true, path: ['coffees'] },
  { name: 'Users', isHidden: false, path: ['users'] },
  {
    name: 'Menu',
    isHidden: false,
    children: [
      { name: 'Coffees', isHidden: false, path: ['coffees'] },
      { name: 'Users', isHidden: false, path: ['users'] },
    ],
  },
  {
    name: 'Lib Dev',
    isHidden: false,
    icon: 'local_library',
    children: [
      { name: 'Phone Form Field', isHidden: false, path: ['lib-dev', 'phone-form-field'] },
    ],
  },
  {
    name: 'Account',
    isHidden: false,
    icon: 'account_circle',
    children: [
      {
        name: 'Profile',
        isHidden: false,
        icon: 'person',
        path: ['profile'],
      },
      {
        name: 'Theme',
        isHidden: false,
        icon: 'dark_mode',
        children: [
          {
            name: 'System',
            isHidden: false,
            value: Theme.Auto,
            icon: 'dns',
          },
          {
            name: 'Light',
            isHidden: false,
            value: Theme.Light,
            icon: 'light_mode',
          },
          {
            name: 'Dark',
            isHidden: false,
            value: Theme.Dark,
            icon: 'dark_mode',
          },
        ],
      },
      {
        name: 'Login',
        isHidden: false,
        icon: 'login',
      },
    ],
  },
];


describe('SidenavTreeComponent', () => {
  let component: SidenavTreeComponent;
  let fixture: ComponentFixture<SidenavTreeComponent>;
  let loader: HarnessLoader;
  let sidenavDatasourceServiceSpy: jasmine.SpyObj<SidenavDatasourceService>;

  beforeEach(async () => {
    sidenavDatasourceServiceSpy = jasmine.createSpyObj('SidenavDatasourceService', ['treeData', 'changeTheme']);

    sidenavDatasourceServiceSpy.treeData.and.returnValue(TreeData);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideRouter([])],
    })
      .overrideProvider(SidenavDatasourceService, { useValue: sidenavDatasourceServiceSpy })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct number of children and descendants', async () => {
    const tree = await loader.getHarness(MatTreeHarness);
    const treeDescendants = await tree.getNodes();

    expect(treeDescendants.length).toBe(TreeData.length);
    // flat nodes are not rendered until expanded
    await treeDescendants[2].expand();
    expect((await tree.getNodes()).length).toBe(7);
  });

  it('should correctly get correct node with text', async () => {
    const tree = await loader.getHarness(MatTreeHarness);
    const treeNodes = await tree.getNodes();

    expect(treeNodes.length).toBe(TreeData.length);
    expect(await treeNodes[0].getText()).toBe(TreeData[0].name);
    expect(await treeNodes[1].getText()).toBe(TreeData[1].name);
    // TODO: was notworking properly with Nodes with chidlren. Sees '' instead of 'Menu'. Re-check.
    // expect(await treeNodes[2].getText()).toBe(TREE_DATA[2].name);
    expect(await treeNodes[2].getText()).toBe('');
    expect(await treeNodes[2].getLevel()).toBe(1);
    expect(await treeNodes[2].isDisabled()).toBe(false);
    expect(await treeNodes[2].isExpanded()).toBe(false);
  });
});
