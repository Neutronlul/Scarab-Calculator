/*
Just draw a border round the document.body.
*/
document.body.style.border = "5px solid red";

// Scarab-Calculator.js - Virtual Scrolling Hook Version

class ScarabCalculator {
  constructor() {
    this.processedTables = new Set();
    this.currentUrl = window.location.href;
    this.currentPath = window.location.pathname;
    this.virtualScrollHooks = new Map();
    this.init();
  }

  init() {
    console.log('Scarab Calculator initialized on:', this.currentUrl);
    
    if (!this.shouldRunOnCurrentPage()) {
      console.log('Script should not run on this page, exiting');
      return;
    }
    
    // Try to hook into virtual scrolling first
    this.setupVirtualScrollingHooks();
    
    // Fallback to observation methods
    this.setupUrlWatching();
    this.setupDOMWatching();
    this.setupFallbackCheck();
    
    this.processInitialLoad();
  }

  shouldRunOnCurrentPage() {
    const path = window.location.pathname;
    const href = window.location.href;
    
    if (href.includes('snapshotID=')) {
      return false;
    }
    
    const allowedPaths = ['/', '/stash'];
    return allowedPaths.some(allowedPath => {
      if (allowedPath === '/') {
        return path === '/' || path === '';
      }
      return path.startsWith(allowedPath);
    });
  }

  setupVirtualScrollingHooks() {
    console.log('Setting up virtual scrolling hooks...');
    
    // Hook into React components (if React is available)
    this.hookReactComponents();
    
    // Hook into common virtual scrolling libraries
    this.hookVirtualScrollLibraries();
    
    // Hook into scroll events as fallback
    this.hookScrollEvents();
    
    // Try to detect and hook framework-specific patterns
    this.detectFrameworkPatterns();
  }

  hookReactComponents() {
    // Try to hook into React DevTools or React internals
    if (typeof window.React !== 'undefined') {
      console.log('React detected, attempting to hook render cycle');
      
      // Try to patch React.createElement to catch table row renders
      const originalCreateElement = window.React.createElement;
      if (originalCreateElement) {
        window.React.createElement = (...args) => {
          const element = originalCreateElement.apply(window.React, args);
          
          // Check if this is a table row being created
          if (args[0] === 'tr' || (args[0] && args[0].displayName && args[0].displayName.includes('Row'))) {
            setTimeout(() => this.processAllTables(), 10);
          }
          
          return element;
        };
        console.log('React.createElement hooked');
      }
    }

    // Hook into React Fiber (more advanced)
    this.hookReactFiber();
  }

  hookReactFiber() {
    // Try to find React Fiber root
    const findReactRoot = (element) => {
      for (let key in element) {
        if (key.startsWith('_reactInternalFiber') || key.startsWith('__reactInternalInstance')) {
          return element[key];
        }
      }
      return null;
    };

    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      const reactRoot = findReactRoot(table);
      if (reactRoot) {
        console.log('React Fiber root found for table');
        // We could potentially hook into the fiber update cycle here
      }
    });
  }

  hookVirtualScrollLibraries() {
    // Hook into react-window
    if (window.ReactWindow) {
      console.log('react-window detected');
      this.hookReactWindow();
    }

    // Hook into react-virtualized
    if (window.ReactVirtualized) {
      console.log('react-virtualized detected');
      this.hookReactVirtualized();
    }

    // Hook into @tanstack/react-virtual
    this.hookTanstackVirtual();

    // Check for other virtual scrolling indicators
    this.detectVirtualScrollingPatterns();
  }

  hookReactWindow() {
    // Try to patch FixedSizeList or VariableSizeList
    const patchComponent = (component) => {
      if (component && component.prototype && component.prototype.render) {
        const originalRender = component.prototype.render;
        component.prototype.render = function(...args) {
          const result = originalRender.apply(this, args);
          setTimeout(() => window.scarabCalculator?.processAllTables(), 50);
          return result;
        };
      }
    };

    if (window.ReactWindow.FixedSizeList) {
      patchComponent(window.ReactWindow.FixedSizeList);
    }
    if (window.ReactWindow.VariableSizeList) {
      patchComponent(window.ReactWindow.VariableSizeList);
    }
  }

  hookTanstackVirtual() {
    // Look for @tanstack/react-virtual usage patterns
    const virtualElements = document.querySelectorAll('[data-index], [style*="transform"]');
    if (virtualElements.length > 0) {
      console.log('Potential @tanstack/react-virtual usage detected');
      
      virtualElements.forEach(el => {
        if (!el.dataset.scarabWatched) {
          el.dataset.scarabWatched = 'true';
          
          // Watch for style changes (virtual scrolling often changes transform)
          const observer = new MutationObserver(() => {
            setTimeout(() => this.processAllTables(), 10);
          });
          
          observer.observe(el, {
            attributes: true,
            attributeFilter: ['style', 'data-index']
          });
        }
      });
    }
  }

  detectVirtualScrollingPatterns() {
    // Look for common virtual scrolling patterns
    const patterns = [
      '[class*="virtual"]',
      '[class*="windowed"]', 
      '[class*="virtualized"]',
      '[data-virtual]',
      '[data-index]',
      '[style*="transform: translateY"]'
    ];

    patterns.forEach(pattern => {
      const elements = document.querySelectorAll(pattern);
      if (elements.length > 0) {
        console.log(`Virtual scrolling pattern detected: ${pattern} (${elements.length} elements)`);
        
        elements.forEach(el => {
          if (!el.dataset.scarabHooked) {
            el.dataset.scarabHooked = 'true';
            this.watchVirtualElement(el);
          }
        });
      }
    });
  }

  watchVirtualElement(element) {
    // Watch for attribute changes that indicate virtual scrolling
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'style' || 
              mutation.attributeName === 'data-index' ||
              mutation.attributeName.startsWith('data-')) {
            shouldUpdate = true;
          }
        }
      });
      
      if (shouldUpdate) {
        clearTimeout(this.virtualUpdateTimeout);
        this.virtualUpdateTimeout = setTimeout(() => {
          this.processAllTables();
        }, 20);
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['style', 'data-index', 'data-virtual-index']
    });
  }

  hookScrollEvents() {
    // Hook into scroll events on potential virtual scroll containers
    const scrollContainers = document.querySelectorAll('[class*="scroll"], [class*="virtual"], .overflow-auto, [style*="overflow"]');
    
    scrollContainers.forEach(container => {
      if (!container.dataset.scarabScrollHooked) {
        container.dataset.scarabScrollHooked = 'true';
        
        let scrollTimeout;
        container.addEventListener('scroll', () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            console.log('Scroll event detected, processing tables...');
            this.processAllTables();
          }, 100);
        });
      }
    });
  }

  detectFrameworkPatterns() {
    // Check for common SPA frameworks and their virtual scrolling patterns
    
    // Vue.js virtual scrolling
    if (window.Vue) {
      console.log('Vue.js detected');
    }

    // Angular virtual scrolling
    if (window.ng) {
      console.log('Angular detected');
    }

    // Check for specific table libraries
    this.detectTableLibraries();
  }

  detectTableLibraries() {
    // ag-Grid
    if (window.agGrid) {
      console.log('ag-Grid detected');
      this.hookAgGrid();
    }

    // Material-UI DataGrid
    if (document.querySelector('.MuiDataGrid-root')) {
      console.log('Material-UI DataGrid detected');
      this.hookMuiDataGrid();
    }

    // Ant Design Table
    if (document.querySelector('.ant-table')) {
      console.log('Ant Design Table detected');
    }
  }

  hookAgGrid() {
    // Hook into ag-Grid events
    const gridOptions = window.gridOptions || {};
    const originalOnRowDataChanged = gridOptions.onRowDataChanged;
    
    gridOptions.onRowDataChanged = (...args) => {
      if (originalOnRowDataChanged) {
        originalOnRowDataChanged.apply(this, args);
      }
      setTimeout(() => this.processAllTables(), 50);
    };
  }

  hookMuiDataGrid() {
    // Watch for MUI DataGrid specific changes
    const dataGrids = document.querySelectorAll('.MuiDataGrid-root');
    dataGrids.forEach(grid => {
      if (!grid.dataset.scarabMuiHooked) {
        grid.dataset.scarabMuiHooked = 'true';
        
        const observer = new MutationObserver(() => {
          setTimeout(() => this.processAllTables(), 30);
        });
        
        observer.observe(grid, {
          childList: true,
          subtree: true
        });
      }
    });
  }

  setupUrlWatching() {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      setTimeout(() => this.checkForChanges(), 100);
    };
    
    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      setTimeout(() => this.checkForChanges(), 100);
    };
    
    window.addEventListener('popstate', () => {
      setTimeout(() => this.checkForChanges(), 100);
    });
  }

  setupDOMWatching() {
    this.observer = new MutationObserver((mutations) => {
      let hasNewRows = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              if (node.tagName === 'TR' || 
                  (node.querySelector && node.querySelector('tr'))) {
                hasNewRows = true;
              }
            }
          });
        }
      });
      
      if (hasNewRows) {
        clearTimeout(this.processTimeout);
        this.processTimeout = setTimeout(() => {
          this.processAllTables();
        }, 50);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  setupFallbackCheck() {
    // Reduced frequency since we have hooks
    setInterval(() => {
      if (this.shouldRunOnCurrentPage()) {
        this.processAllTables();
      }
    }, 2000);
  }

  processInitialLoad() {
    this.processAllTables();
    setTimeout(() => this.processAllTables(), 500);
    setTimeout(() => this.processAllTables(), 1500);
  }

  checkForChanges() {
    const newUrl = window.location.href;
    const newPath = window.location.pathname;
    
    if (newUrl !== this.currentUrl || newPath !== this.currentPath) {
      console.log('Navigation detected:', { from: this.currentPath, to: newPath });
      
      this.currentUrl = newUrl;
      this.currentPath = newPath;
      
      if (!this.shouldRunOnCurrentPage()) {
        console.log('Script should not run on new page');
        return;
      }
      
      this.processedTables.clear();
      
      // Re-setup hooks for new page
      setTimeout(() => {
        this.setupVirtualScrollingHooks();
        this.processAllTables();
      }, 300);
    }
  }

  processAllTables() {
    if (!this.shouldRunOnCurrentPage()) {
      return;
    }
    
    const tables = document.querySelectorAll('table');
    console.log(`Processing ${tables.length} tables on ${this.currentPath}`);
    
    tables.forEach((table, index) => {
      try {
        this.addScarabColumn(table);
      } catch (error) {
        console.error('Error processing table:', error);
      }
    });
  }

  addScarabColumn(table) {
    // Add header (only if not already present)
    const headerRow = table.querySelector('thead tr') || table.querySelector('tr');
    if (headerRow && !headerRow.querySelector('.scarab-calculator-header')) {
      const th = document.createElement('th');
      th.textContent = 'Scarab Value';
      th.className = 'scarab-calculator-header scarab-calculator-column';
      th.style.cssText = `
        background-color: #4a5568 !important; 
        color: white !important; 
        font-weight: bold !important;
        padding: 8px !important;
        border: 1px solid #2d3748 !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 10 !important;
      `;
      headerRow.appendChild(th);
      console.log('Header added to table');
    }

    // Process ALL visible rows
    const bodyRows = table.querySelectorAll('tbody tr') || 
                     Array.from(table.querySelectorAll('tr')).slice(headerRow ? 1 : 0);
    
    let addedCount = 0;
    bodyRows.forEach((row, index) => {
      if (!row.querySelector('.scarab-calculator-cell')) {
        const td = document.createElement('td');
        td.className = 'scarab-calculator-cell scarab-calculator-column';
        
        const calculatedValue = this.calculateScarabValue(row, index);
        td.textContent = calculatedValue;
        td.style.cssText = `
          background-color: #f7fafc !important; 
          text-align: right !important;
          padding: 8px !important;
          border: 1px solid #e2e8f0 !important;
          font-family: monospace !important;
        `;
        
        row.appendChild(td);
        addedCount++;
      }
    });
    
    if (addedCount > 0) {
      console.log(`Added ${addedCount} new cells`);
    }
  }

  calculateScarabValue(row, index) {
    try {
      const cells = row.querySelectorAll('td');
      
      for (let cell of cells) {
        const text = cell.textContent.trim();
        
        // Look for currency values
        const matches = text.match(/(\d+(?:\.\d+)?)\s*(chaos|divine|c|d)/i);
        if (matches) {
          const value = parseFloat(matches[1]);
          const currency = matches[2].toLowerCase();
          
          if (currency.includes('divine') || currency === 'd') {
            return `${(value * 200).toFixed(1)}c`;
          } else {
            return `${(value * 1.15).toFixed(1)}c`;
          }
        }
        
        const number = parseFloat(text.replace(/[^\d.-]/g, ''));
        if (!isNaN(number) && number > 0) {
          return `${(number * 1.15).toFixed(1)}`;
        }
      }
      
      return `Row ${index + 1}`;
    } catch (error) {
      console.error('Calculation error:', error);
      return 'Error';
    }
  }
}

// Initialize
console.log('Scarab Calculator (Virtual Scrolling Hook Version) loaded');

function initCalculator() {
  if (window.scarabCalculator) {
    return;
  }
  window.scarabCalculator = new ScarabCalculator();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalculator);
} else {
  initCalculator();
}

setTimeout(initCalculator, 1000);