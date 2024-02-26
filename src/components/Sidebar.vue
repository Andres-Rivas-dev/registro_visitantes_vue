<template>
  <div class="sidebar-container" :class="{ open: isOpen }">
    <div class="sidebar">
      <ul>
        <template v-for="(item, index) in menuItems" :key="index">
          <li v-if="!hasSubgroups(item.subgrupo)">
            <router-link :to="{ path: item.url }">{{ item.nombre }}</router-link>
          </li>
          <li v-else>
            <div @click="toggleSubgroup(index)">
              <span>{{ item.nombre }}</span>
              <i :class="{'fas fa-caret-down': isOpenSubgroup(index), 'fas fa-caret-right': !isOpenSubgroup(index)}"></i>
            </div>
            <ul v-if="isOpenSubgroup(index)">
              <template v-for="(subItem, subIndex) in item.subgrupo" :key="subIndex">
                <li v-if="!hasSubgroups(subItem.subgrupo)">
                  <router-link :to="{ path: subItem.url }">{{ subItem.nombre }}</router-link>
                </li>
                <li v-else>
                  <div @click="toggleSubgroupNested(index, subIndex)">
                    <span>{{ subItem.nombre }}</span>
                    <i :class="{'fas fa-caret-down': isOpenSubgroupNested(index, subIndex), 'fas fa-caret-right': !isOpenSubgroupNested(index, subIndex)}"></i>
                  </div>
                  <ul v-if="isOpenSubgroupNested(index, subIndex)">
                    <li v-for="(subSubItem, subSubIndex) in subItem.subgrupo" :key="subSubIndex">
                      <router-link :to="subSubItem.url">{{ subSubItem.nombre }}</router-link>
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </div>
    <div>
      <button @click="toggleSidebar" class="hamburger-btn" :class="{ open: isOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <!-- <div class="topnav">
      <a class="active">
        <router-link :to="{ path: 'Registro' }">Registro de usuario</router-link>
      </a>
      <a>
        <router-link :to="{ path: '/Usuarios' }">Login</router-link>
      </a>
      <a>
        <router-link :to="{ path: '/Bienvenidos' }">bienvenidos</router-link>
      </a>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isOpen: false,
      menuItems: [],
      openSubgroupIndex: null,
      openSubgroupNestedIndex: null,
    };
  },
  mounted() {
    this.fetchMenuData();
  },
  methods: {
    async fetchMenuData() {
      try {
        const response = await axios.get('http://localhost:8000/api/menu/get');
        this.menuItems = this.processMenuData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    processMenuData(data) {
      const processItem = item => {
        const newItem = {
          id: item.id,
          nombre: item.nombre,
          url: item.url,
          subgrupo: item.subgrupo.map(subItem => processItem(subItem))
        };
        return newItem;
      };
      return data.map(item => processItem(item));
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    toggleSubgroup(index) {
      if (this.openSubgroupIndex === index) {
        this.openSubgroupIndex = null;
      } else {
        this.openSubgroupIndex = index;
      }
    },
    isOpenSubgroup(index) {
      return this.openSubgroupIndex === index;
    },
    toggleSubgroupNested(parentIndex, index) {
      if (
        this.openSubgroupNestedIndex === index &&
        this.openSubgroupIndex === parentIndex
      ) {
        this.openSubgroupNestedIndex = null;
      } else {
        this.openSubgroupNestedIndex = index;
        this.openSubgroupIndex = parentIndex;
      }
    },
    isOpenSubgroupNested(parentIndex, index) {
      return (
        this.openSubgroupNestedIndex === index &&
        this.openSubgroupIndex === parentIndex
      );
    },
    hasSubgroups(subgroup) {
      return subgroup && subgroup.length > 0;
    }
  }
};
</script>

<style scoped>
.topnav {
  overflow: hidden;
  background-color: #ffffff; /* Fondo blanco */
  color: #000000; /* Letras negras */
  position: fixed;
  top: 0;
  left: 4rem;
  width: calc(100% - 4rem); /* Se resta el ancho del sidebar */
  border-bottom: 2px solid #000000;
}

.topnav a {
  float: left;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: #000000;
}

.topnav a.active {
  background-color: #04aa6d;
  color: #ffffff;
}

.sidebar {
  background-color: #333;
  color: white;
  transition: transform 0.3s ease;
  transform: translateX(-100%); /* Oculta el menú fuera de la pantalla */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
}

.open .sidebar {
  transform: translateX(0); /* Muestra el menú cuando está abierto */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0; /* Asegura que no haya espacio adicional alrededor de la lista */
}

.sidebar li {
  padding: 10px;
}

.sidebar li:hover {
  background-color: #555;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  top: 8px;
  right: -7px;
}

.hamburger-btn span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #000000; /* Color negro */
  margin-bottom: 5px;
  transition: transform 0.3s ease;
}

.hamburger-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-btn.open span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}
</style>
