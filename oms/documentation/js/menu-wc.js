'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">oms documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-112d38ae7b1d5c7597a11a3ada09ae42"' : 'data-target="#xs-components-links-module-AppModule-112d38ae7b1d5c7597a11a3ada09ae42"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-112d38ae7b1d5c7597a11a3ada09ae42"' :
                                            'id="xs-components-links-module-AppModule-112d38ae7b1d5c7597a11a3ada09ae42"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategorySoldGraphComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategorySoldGraphComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateSupplyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateSupplyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ItemSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ItemViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderPriceGraphComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderPriceGraphComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderUpdateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderUpdateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CaseListDatasource.html" data-type="entity-link">CaseListDatasource</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseListDatasource-1.html" data-type="entity-link">CaseListDatasource</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseListDatasource-2.html" data-type="entity-link">CaseListDatasource</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseListDatasource-3.html" data-type="entity-link">CaseListDatasource</a>
                            </li>
                            <li class="link">
                                <a href="classes/itemList.html" data-type="entity-link">itemList</a>
                            </li>
                            <li class="link">
                                <a href="classes/itemOrder.html" data-type="entity-link">itemOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/loginclass.html" data-type="entity-link">loginclass</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order_Address.html" data-type="entity-link">Order_Address</a>
                            </li>
                            <li class="link">
                                <a href="classes/supply_order.html" data-type="entity-link">supply_order</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ItemSearchService.html" data-type="entity-link">ItemSearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderCreateService.html" data-type="entity-link">OrderCreateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderSearchService.html" data-type="entity-link">OrderSearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link">OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderUpdateService.html" data-type="entity-link">OrderUpdateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SupplyCreateService.html" data-type="entity-link">SupplyCreateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SupplyserviceService.html" data-type="entity-link">SupplyserviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VerifyLoginService.html" data-type="entity-link">VerifyLoginService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DataPoint.html" data-type="entity-link">DataPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSet.html" data-type="entity-link">DataSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Element.html" data-type="entity-link">Element</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Item.html" data-type="entity-link">Item</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Item-1.html" data-type="entity-link">Item</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Item-2.html" data-type="entity-link">Item</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemDescription.html" data-type="entity-link">ItemDescription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/itemPost.html" data-type="entity-link">itemPost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemSupplyElement.html" data-type="entity-link">ItemSupplyElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShipNode.html" data-type="entity-link">ShipNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShipNodeItemElement.html" data-type="entity-link">ShipNodeItemElement</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});