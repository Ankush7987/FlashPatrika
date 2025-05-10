/**
 * Performance Monitoring Utility
 * 
 * This utility provides functions to measure and report various performance metrics
 * for the FlashPatrika news application, helping identify bottlenecks and optimize
 * user experience.
 */

// Initialize performance monitoring
const performanceMonitor = {
  metrics: {},
  marks: {},
  initialized: false,
  
  /**
   * Initialize the performance monitoring
   */
  init() {
    if (typeof window === 'undefined' || this.initialized) return;
    this.initialized = true;
    
    // Capture navigation timing metrics when page loads
    window.addEventListener('load', () => {
      this.captureNavigationTiming();
    });
    
    // Monitor long tasks
    this.observeLongTasks();
    
    // Monitor first input delay
    this.observeFirstInput();
    
    // Setup periodic reporting
    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        this.reportMetrics();
      }, 10000); // Report after 10 seconds
    }
  },
  
  /**
   * Capture navigation timing metrics
   */
  captureNavigationTiming() {
    if (typeof window === 'undefined' || !window.performance) return;
    
    const navigation = window.performance.timing;
    const navStart = navigation.navigationStart;
    
    this.metrics.ttfb = navigation.responseStart - navStart; // Time to First Byte
    this.metrics.fcp = this.getFCP(); // First Contentful Paint
    this.metrics.domLoad = navigation.domContentLoadedEventEnd - navStart; // DOM Content Loaded
    this.metrics.windowLoad = navigation.loadEventEnd - navStart; // Window Load
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚡ Performance metrics:', this.metrics);
    }
  },
  
  /**
   * Get First Contentful Paint metric
   */
  getFCP() {
    if (typeof window === 'undefined' || !window.performance) return 0;
    
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    
    return fcpEntry ? fcpEntry.startTime : 0;
  },
  
  /**
   * Observe long tasks (tasks taking more than 50ms)
   */
  observeLongTasks() {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;
    
    try {
      const longTaskObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        
        entries.forEach(entry => {
          // Only log in development
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`⚠️ Long task detected: ${Math.round(entry.duration)}ms`);
          }
          
          // Track total long task time
          this.metrics.longTaskTime = (this.metrics.longTaskTime || 0) + entry.duration;
          this.metrics.longTaskCount = (this.metrics.longTaskCount || 0) + 1;
        });
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Long task observation not supported', e);
    }
  },
  
  /**
   * Observe first input delay
   */
  observeFirstInput() {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;
    
    try {
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const firstInput = entries[0];
        
        if (firstInput) {
          this.metrics.fid = firstInput.processingStart - firstInput.startTime;
          
          // Only log in development
          if (process.env.NODE_ENV !== 'production') {
            console.log(`⚡ First Input Delay: ${Math.round(this.metrics.fid)}ms`);
          }
          
          fidObserver.disconnect();
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('First Input Delay observation not supported', e);
    }
  },
  
  /**
   * Mark the start of a custom performance measurement
   * @param {string} name - The name of the mark
   */
  markStart(name) {
    if (typeof window === 'undefined' || !window.performance) return;
    
    const markName = `${name}_start`;
    performance.mark(markName);
    this.marks[name] = markName;
  },
  
  /**
   * Mark the end of a custom performance measurement and record the duration
   * @param {string} name - The name of the mark
   */
  markEnd(name) {
    if (typeof window === 'undefined' || !window.performance || !this.marks[name]) return;
    
    const startMark = this.marks[name];
    const endMark = `${name}_end`;
    
    performance.mark(endMark);
    performance.measure(name, startMark, endMark);
    
    const entries = performance.getEntriesByName(name, 'measure');
    if (entries.length > 0) {
      const duration = entries[0].duration;
      this.metrics[name] = duration;
      
      // Only log in development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`⚡ ${name}: ${Math.round(duration)}ms`);
      }
    }
    
    // Clean up marks
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(name);
    delete this.marks[name];
  },
  
  /**
   * Report metrics to analytics or monitoring service
   */
  reportMetrics() {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;
    
    // In a real application, you would send these metrics to your analytics service
    // Example: sendToAnalytics(this.metrics);
    
    // For now, we'll just log to console in production with a special flag
    if (localStorage.getItem('enable_performance_logging') === 'true') {
      console.log('📊 Performance Report:', this.metrics);
    }
  }
};

// Export the performance monitor
export default performanceMonitor;