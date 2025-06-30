variable "project_id" {
  type        = string
  description = "ID du projet Google Cloud"
}

variable "region" {
  type        = string
  description = "Région GCP"
  default     = "europe-west9"
}

variable "api_image" {
  type        = string
  description = "Image Docker de l'API (ex : docker.io/tonuser/quickquote-api)"
}

variable "db_user" {
  type        = string
  description = "Utilisateur PostgreSQL"
  default     = "quickquote"
}

variable "db_password" {
  type        = string
  description = "Mot de passe PostgreSQL"
  sensitive   = true
}

variable "db_name" {
  type        = string
  description = "Nom de la base de données"
  default     = "quickquote_db"
}
