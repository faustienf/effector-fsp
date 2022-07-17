<p align="center">
  <img src="https://raw.githubusercontent.com/faustienf/effector-fsp/main/assets/header.png">
</p>

# ☄️ Effector FSP

```mermaid
flowchart LR
  subgraph Combine
    direction LR
    Filter --> Sort
    Sort --> Paginate
  end
  Data -.-> Combine
  Combine -.-> FSP
```

```ts
const $todos = createStore<Todo[]>([]);
```

#### Filter

```ts
const filters = createFilters($todos, (todo, field, value) =>
  String(todo[field]).toLowerCase().includes(value.toLowerCase())
);
```

#### Sort

```ts
const sorting = createSorting({
  $allRecords: filters.$filtredRecords,
  comparator: todoComparator,
  initialField: 'id' as keyof Todo,
  initialOrder: 'desc',
});
```

#### Paginate

```ts
const pagination = createPagination(sorting.$sortedRecords, 10);
```
