<div
            class="d-sm-flex align-items-center justify-content-between mb-4"
          >
            <h1 class="h3 mb-0 text-gray-800">Commandes</h1>
            <button class="btn btn-primary btn-sm add-commande-btn">
              <i class="fas fa-plus me-1"></i> Ajouter une commande
            </button>
          </div>

          <!-- Liste des Commandes -->
          <div class="card shadow mb-4">
            <div
              class="card-header py-3 d-flex justify-content-between align-items-center"
            >
              <h6 class="m-0 font-weight-bold text-primary">
                Liste des commandes
              </h6>
              <div class="dropdown">
                <button
                  aria-label="btn"
                  class="btn btn-sm btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-cog"></i>
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a class="dropdown-item export-excel" href="#"
                      ><i class="fas fa-file-excel me-2"></i>Exporter en
                      Excel</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item export-pdf" href="#"
                      ><i class="fas fa-file-pdf me-2"></i>Exporter en PDF</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="commandesTable"
                  class="table table-striped table-bordered"
                  style="width: 100%"
                >
                  <thead class="table-light">
                    <tr>
                      <th>N° Commande</th>
                      <th>Client</th>
                      <th>Médicament</th>
                      <th>Quantité</th>
                      <th>Prix Total</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Les données seront chargées dynamiquement -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>