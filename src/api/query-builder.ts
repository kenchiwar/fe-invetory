/**
 * Enum for sort directions
 */
export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

/**
 * Interface for sort configuration
 */
export interface SortConfig {
  field: string
  direction: SortDirection
}

/**
 * Interface for filter range
 */
export interface FilterRange {
  min?: number | string | Date
  max?: number | string | Date
}

/**
 * Interface for filter configuration
 */
export interface FilterConfig {
  [field: string]: string | number | boolean | Date | FilterRange | Array<string | number>
}

/**
 * Interface for pagination configuration
 */
export interface PaginationConfig {
  skip?: number
  take?: number
}

/**
 * Class for building API query parameters
 */
export class QueryBuilder {
  private _sort: SortConfig[] = []
  private _filter: FilterConfig = {}
  private _pagination: PaginationConfig = {}
  private _search: string | null = null
  private _includes: string[] = []
  private _customParams: Record<string, any> = {}

  /**
   * Add a sort configuration
   * @param field Field to sort by
   * @param direction Sort direction (asc or desc)
   */
  sortBy(field: string, direction: SortDirection = SortDirection.ASC): QueryBuilder {
    this._sort.push({ field, direction })
    return this
  }

  /**
   * Add a filter for a specific field
   * @param field Field to filter by
   * @param value Value to filter for
   */
  filterBy(
    field: string,
    value: string | number | boolean | Date | FilterRange | Array<string | number>,
  ): QueryBuilder {
    this._filter[field] = value
    return this
  }

  /**
   * Add a range filter for a specific field
   * @param field Field to filter by
   * @param min Minimum value
   * @param max Maximum value
   */
  filterByRange(field: string, min?: number | string | Date, max?: number | string | Date): QueryBuilder {
    this._filter[field] = { min, max }
    return this
  }

  /**
   * Set pagination parameters
   * @param skip Number of items to skip
   * @param take Number of items to take
   */
  paginate(skip = 0, take = 10): QueryBuilder {
    this._pagination = { skip, take }
    return this
  }

  /**
   * Set search term
   * @param term Search term
   */
  search(term: string): QueryBuilder {
    this._search = term
    return this
  }

  /**
   * Add related entities to include in the response
   * @param entities Entity names to include
   */
  include(...entities: string[]): QueryBuilder {
    this._includes.push(...entities)
    return this
  }

  /**
   * Add custom query parameters
   * @param key Parameter key
   * @param value Parameter value
   */
  addParam(key: string, value: any): QueryBuilder {
    this._customParams[key] = value
    return this
  }

  /**
   * Build query parameters object
   */
  build(): Record<string, any> {
    const params: Record<string, any> = {
      ...this._customParams,
    }

    // Add sort parameters
    if (this._sort.length > 0) {
      params.sortBy = this._sort.map((s) => s.field).join(",")
      params.sortDirection = this._sort.map((s) => s.direction).join(",")
    }

    // Add filter parameters
    for (const [key, value] of Object.entries(this._filter)) {
      if (typeof value === "object" && !Array.isArray(value) && value !== null) {
        const range = value as FilterRange
        if (range.min !== undefined) {
          params[`${key}Min`] = range.min
        }
        if (range.max !== undefined) {
          params[`${key}Max`] = range.max
        }
      } else {
        params[key] = value
      }
    }

    // Add pagination parameters
    if (this._pagination.skip !== undefined) {
      params.skip = this._pagination.skip
    }
    if (this._pagination.take !== undefined) {
      params.take = this._pagination.take
    }

    // Add search parameter
    if (this._search) {
      params.search = this._search
    }

    // Add includes parameter
    if (this._includes.length > 0) {
      params.include = this._includes.join(",")
    }

    return params
  }

  /**
   * Build query string
   */
  buildQueryString(): string {
    const params = this.build()
    const queryParams = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`${key}[]`, v.toString()))
        } else {
          queryParams.append(key, value.toString())
        }
      }
    }

    return queryParams.toString()
  }

  /**
   * Static method to create a new QueryBuilder instance
   */
  static create(): QueryBuilder {
    return new QueryBuilder()
  }
}

