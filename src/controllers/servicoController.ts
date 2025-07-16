import { Request, Response } from "express";
import { buscarServicoPorSlug, listarServicosProximos } from "../services/servicoService";

export const getServicosProximos = async (req: Request, res: Response) => {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const tipo = req.query.tipo?.toString().toUpperCase(); // ex: PETSHOP

    if (isNaN(lat) || isNaN(lng)) {
      res.status(400).json({
        erro: "Parâmetros 'lat' e 'lng' são obrigatórios e devem ser números.",
      });
      return;
    }

    const servicos = await listarServicosProximos({
      latitude: lat,
      longitude: lng,
      tipo,
    });

    res.json(servicos);
  } catch (error: any) {
    res.status(500).json({ erro: error.message });
  }
};

export const getServicoPorSlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const servico = await buscarServicoPorSlug(slug);
    res.json(servico);
  } catch (error: any) {
    res.status(404).json({ erro: error.message });
  }
};
