# Team manager

```ts
  viewMode: 'card' | 'list' = 'card';
  departments = ['Development', 'Marketing', 'Design'];
  selectedDept = 'All';

  newMember = {
    name: '',
    age: 0,
    department: this.departments[0],
    isAvailable: true
  };

  team = [
    { name: 'Esraa', age: 24, department: 'Development', isAvailable: true },
    { name: 'Ahmed', age: 29, department: 'Marketing', isAvailable: false },
    { name: 'Laila', age: 31, department: 'Design', isAvailable: true }
  ];

  addMember() {
    if (this.newMember.name && this.newMember.age && this.newMember.department) {
      this.team.push({ ...this.newMember });
      this.newMember = { name: '', age: 0, department: this.departments[0], isAvailable: true };
    }
  }

  toggleAvailability(member: any) {
    member.isAvailable = !member.isAvailable;
  }

```

---
```html
<h1>👩‍💻 Team Manager</h1>

<!-- 🔁 Select View Mode -->
<select [(ngModel)]="viewMode">
  <option value="card">Card View</option>
  <option value="list">List View</option>
</select>

<!-- 🔁 Filter by Department -->
<select [(ngModel)]="selectedDept">
  <option value="All">All</option>
  @for (dept of departments; track dept) {
    <option [value]="dept">{{ dept }}</option>
  }
</select>

<!-- 📝 Add Member -->
<h3>Add New Member</h3>
<input [(ngModel)]="newMember.name" placeholder="Name">
<input [(ngModel)]="newMember.age" placeholder="Age" type="number">
<select [(ngModel)]="newMember.department">
  <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
</select>

<label>
  <input type="checkbox" [(ngModel)]="newMember.isAvailable" />
  Available
</label>
<button (click)="addMember()">Add</button>

<!-- 🧑‍🤝‍🧑 Team List -->
<h2>Team Members</h2>

@for (member of team; track member) {
  @if (selectedDept === 'All' || member.department === selectedDept) {
    
    @switch (viewMode) {
      @case ('card') {
        <div class="card">
          <h4>{{ member.name }}</h4>
          <p>Age: {{ member.age }}</p>
          <p>Department: {{ member.department }}</p>
          <p>Status: {{ member.isAvailable ? 'Available' : 'Unavailable' }}</p>
          <button (click)="toggleAvailability(member)">Toggle</button>
        </div>
      }
      @case ('list') {
        <ul>
          <li>
            {{ member.name }} - {{ member.department }} - 
            <strong>{{ member.isAvailable ? '✔️' : '❌' }}</strong>
            <button (click)="toggleAvailability(member)">Toggle</button>
          </li>
        </ul>
      }
    }
    
  }
}
```
---
```css
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10px;
  background: #f9f9f9;
}
```
