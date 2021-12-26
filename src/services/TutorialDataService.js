import http from "../http-common";

class TutorialDataService {
  getAll(page) {
    return http.get(`/products?page=${page}`);
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post("/products", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  setColor(id, color, color_code) {
    return http.get(`/set-color?id=${id}&color=${color}&color_code=${color_code}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  findByTitle(title) {
    return http.get(`/products?title=${title}`);
  }
}

export default new TutorialDataService();