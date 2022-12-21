/**
 * Single responsibility
 */

/**
 * One single class with methods that don't have the same propose
 */
class StatisticsMain {
  public computeSalesStatistics() {
    // ...
  }
  public generateReport() {
    // ...
  }
}

/**
 * Separated class with different proposes
 */
class Statistics {
  public computeSalesStatistics() {
    // ...
  }
}
class ReportGenerator {
  public generateReport() {
    // ...
  }
}