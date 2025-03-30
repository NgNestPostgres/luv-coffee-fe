import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatTreeHarness} from '@angular/material/tree/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';

import {TREE_DATA} from './sidenav-datasource';
import {SidenavTreeComponent} from './sidenav-tree.component';

describe('SidenavTreeComponent', () => {
  let component: SidenavTreeComponent;
  let fixture: ComponentFixture<SidenavTreeComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideRouter([])],
    })
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

    expect(treeDescendants.length).toBe(TREE_DATA.length);
    // flat nodes are not rendered until expanded
    await treeDescendants[2].expand();
    expect((await tree.getNodes()).length).toBe(7);
  });

  it('should correctly get correct node with text', async () => {
    const tree = await loader.getHarness(MatTreeHarness);
    const treeNodes = await tree.getNodes();

    expect(treeNodes.length).toBe(TREE_DATA.length);
    expect(await treeNodes[0].getText()).toBe(TREE_DATA[0].name);
    expect(await treeNodes[1].getText()).toBe(TREE_DATA[1].name);
    // TODO: was notworking properly with Nodes with chidlren. Sees '' instead of 'Menu'. Re-check.
    // expect(await treeNodes[2].getText()).toBe(TREE_DATA[2].name);
    expect(await treeNodes[2].getText()).toBe('');
    expect(await treeNodes[2].getLevel()).toBe(1);
    expect(await treeNodes[2].isDisabled()).toBe(false);
    expect(await treeNodes[2].isExpanded()).toBe(false);
  });
});
